import { useState, useEffect, useRef } from 'react';
import { type CrmPerson, getPersonById } from '@/services/crm-people/crm-people.service';
import { PersonType } from './PersonSelectionModal.types';
import { getServiceFunction, getDisplayName } from './PersonSelectionModal.utils';
import { removeAccents } from '@/common/utils/removeAccents';

export const usePersonSelection = (personType: PersonType, isOpen: boolean, searchTerm: string, selectedPersonId?: string, selectedPersonName?: string) => {
  const [people, setPeople] = useState<CrmPerson[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPersonPreloaded, setSelectedPersonPreloaded] = useState<CrmPerson | null>(null);
  const [selectedPersonUpdated, setSelectedPersonUpdated] = useState<{ person: any; updated: boolean } | null>(null);

  // Load people when modal opens
  useEffect(() => {
    if (isOpen) {
      console.log(`🔄 PersonModal: Modal opened for ${personType}, loading fresh data...`);
      setLoading(true);
      setPeople([]);
      setCurrentPage(1);
      setHasMore(true);
      setLoadingMore(false);
      setSearchLoading(false);
      setSelectedPersonPreloaded(null);
      
      // Pre-load selected person if exists
      if (selectedPersonId) {
        preloadSelectedPerson(selectedPersonId);
      } else {
        loadPeople(1, true);
      }
    } else {
      setPeople([]);
      setLoading(false);
      setLoadingMore(false);
      setSearchLoading(false);
      setSelectedPersonPreloaded(null);
      setSelectedPersonUpdated(null);
    }
  }, [isOpen, personType]);

  // Debounce search with 200ms delay
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const trimmedSearch = searchTerm.trim();
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (trimmedSearch.length >= 2) {
      setSearchLoading(true);
      searchTimeoutRef.current = setTimeout(() => {
        console.log(`🔍 Debounced search triggered for ${personType}:`, trimmedSearch);
        setCurrentPage(1);
        setHasMore(true);
        loadPeople(1, true);
      }, 200);
    } else if (trimmedSearch.length === 0) {
      setCurrentPage(1);
      setHasMore(true);
      loadPeople(1, true);
    }
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, personType]);

  // Pre-load selected person by ID
  const preloadSelectedPerson = async (personId: string) => {
    try {
      console.log(`🎯 PersonModal: Pre-loading selected ${personType} with ID: ${personId}`);
      
      const selectedPerson = await getPersonById(personId);
      console.log(`✅ PersonModal: Pre-loaded selected ${personType}:`, selectedPerson);
      
      setSelectedPersonPreloaded(selectedPerson);
      setPeople([selectedPerson]);
      
      // Check if the name changed from what was previously selected
      if (selectedPersonName) {
        console.log(`🔍 PersonModal: Checking name change - current selected: "${selectedPersonName}"`);
        
        // Create a simple translation function for comparison (fallback to key)
        const simpleT = (key: string) => key;
        const currentName = getDisplayName(selectedPerson, simpleT);
        
        console.log(`🔍 PersonModal: Fresh name from API: "${currentName}"`);
        
        if (currentName !== selectedPersonName) {
          console.log(`🔄 PersonModal: Name changed from "${selectedPersonName}" to "${currentName}"`);
          setSelectedPersonUpdated({
            person: {
              id: selectedPerson._id || selectedPerson.id,
              name: currentName,
              ...selectedPerson
            },
            updated: true
          });
        } else {
          console.log(`✅ PersonModal: Name unchanged: "${currentName}"`);
        }
      }
      
      // Now load the first page normally
      loadPeople(1, false);
      
    } catch (error) {
      console.error(`❌ PersonModal: Error pre-loading selected ${personType}:`, error);
      // If pre-loading fails, just load normally
      loadPeople(1, true);
    }
  };

  const loadPeople = async (page: number = 1, reset: boolean = false) => {
    try {
      console.log(`🚀 PersonModal: Loading ${personType} - Page ${page}, Reset: ${reset}`);
      
      if (!reset) {
        setLoadingMore(true);
      }

      const searchOptions = {
        page, 
        limit: 10,
        ...(searchTerm.trim().length >= 2 && { search: removeAccents(searchTerm.trim()) })
      };

      // Add sort for traders
      if (personType === 'traders') {
        (searchOptions as any).sort = { full_name: '1' };
      }

      const serviceFunction = getServiceFunction(personType);
      
      // Start loading timer for minimum 300ms delay
      const startTime = Date.now();
      const response = await serviceFunction(searchOptions);
      
      console.log(`✅ PersonModal: Loaded ${response.data.length} ${personType}`);
      console.log(`📊 PersonModal: Pagination - Page ${response._meta.page_number}/${response._meta.total_pages}, Total: ${response._meta.total_elements}`);
      
      // Calculate remaining time to ensure minimum 300ms loading
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 300 - elapsedTime);
      
      // Wait for remaining time if necessary
      if (remainingTime > 0 && !reset) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      // Filter duplicates - remove any person that already exists in the current list
      const filterDuplicates = (newPeople: CrmPerson[], existingPeople: CrmPerson[]) => {
        const existingIds = new Set(existingPeople.map(person => person._id || person.id));
        return newPeople.filter(person => !existingIds.has(person._id || person.id));
      };

      if (reset) {
        // For reset (first load), apply normal sorting logic
        const sortPeopleWithSelected = (peopleList: CrmPerson[]) => {
          if (!selectedPersonId) return peopleList;
          
          const selectedIndex = peopleList.findIndex(person => 
            (person._id || person.id) === selectedPersonId
          );
          
          if (selectedIndex > 0) {
            const selectedPerson = peopleList[selectedIndex];
            return [selectedPerson, ...peopleList.slice(0, selectedIndex), ...peopleList.slice(selectedIndex + 1)];
          }
          
          return peopleList;
        };
        
        // Force re-render by creating new array reference
        const sortedPeople = sortPeopleWithSelected(response.data);
        setPeople([...sortedPeople]);
      } else {
        // For pagination (adding more), filter duplicates first
        setPeople(prev => {
          const filteredNewPeople = filterDuplicates(response.data, prev);
          return [...prev, ...filteredNewPeople];
        });
      }
      
      // Check if we have more data - stop if current page returned empty or if we've reached the end
      const hasMoreData = response.data.length > 0 && response._meta.page_number < response._meta.total_pages;
      setHasMore(hasMoreData);
      setCurrentPage(response._meta.page_number);
      
    } catch (error) {
      console.error(`❌ PersonModal: Error fetching ${personType}:`, error);
      if (reset) {
        setPeople([]);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setSearchLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loadingMore && !loading && !searchLoading) {
      loadPeople(currentPage + 1, false);
    }
  };

  const clearSelectedPersonUpdated = () => {
    setSelectedPersonUpdated(null);
  };

  return {
    people,
    loading,
    loadingMore,
    searchLoading,
    hasMore,
    handleLoadMore,
    selectedPersonUpdated,
    clearSelectedPersonUpdated
  };
};