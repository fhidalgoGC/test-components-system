import type { TagItem } from '@/lib/ui-library/TagSelector';

// Example of static tags with multi-language support
export const getStaticTags = async (): Promise<TagItem[]> => {
  // Simulate async loading
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'fruits',
      label: {
        en: 'Fruits',
        es: 'Frutas',
        fr: 'Fruits',
        default: 'Fruits'
      }
    },
    {
      id: 'vegetables', 
      label: {
        en: 'Vegetables',
        es: 'Vegetales',
        fr: 'Légumes',
        default: 'Vegetables'
      }
    },
    {
      id: 'dairy',
      label: {
        en: 'Dairy',
        es: 'Lácteos',
        fr: 'Produits laitiers',
        default: 'Dairy'
      }
    },
    {
      id: 'meat',
      label: {
        en: 'Meat',
        es: 'Carne',
        fr: 'Viande',
        default: 'Meat'
      }
    }
  ];
};

// Example of API-like tags function
export const getApiTags = async (): Promise<TagItem[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real scenario, this would be:
  // const response = await fetch('/api/tags');
  // return response.json();
  
  return [
    {
      id: 'technology',
      label: {
        en: 'Technology',
        es: 'Tecnología',
        pt: 'Tecnologia',
        default: 'Technology'
      }
    },
    {
      id: 'design',
      label: {
        en: 'Design',
        es: 'Diseño',
        it: 'Design',
        default: 'Design'
      }
    },
    {
      id: 'programming',
      label: {
        en: 'Programming',
        es: 'Programación',
        de: 'Programmierung',
        default: 'Programming'
      }
    }
  ];
};