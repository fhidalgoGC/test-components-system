/**
 * TagSelector Utilities
 * 
 * Helper functions for TagSelector component
 */

import type { TagItem } from '../types/tag-selector.type';

/**
 * Filter tags by search term
 */
export function filterTagsBySearch<T extends TagItem>(
  tags: T[],
  searchTerm: string
): T[] {
  if (!searchTerm.trim()) return tags;
  
  const term = searchTerm.toLowerCase();
  return tags.filter(tag => 
    tag.label.toLowerCase().includes(term) ||
    tag.id.toString().toLowerCase().includes(term)
  );
}

/**
 * Sort tags by label alphabetically
 */
export function sortTagsByLabel<T extends TagItem>(
  tags: T[],
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...tags].sort((a, b) => {
    const comparison = a.label.localeCompare(b.label);
    return order === 'asc' ? comparison : -comparison;
  });
}

/**
 * Get selected tags from all tags by IDs
 */
export function getSelectedTags<T extends TagItem>(
  allTags: T[],
  selectedIds: (string | number)[]
): T[] {
  return allTags.filter(tag => selectedIds.includes(tag.id));
}

/**
 * Get unselected tags
 */
export function getUnselectedTags<T extends TagItem>(
  allTags: T[],
  selectedIds: (string | number)[]
): T[] {
  return allTags.filter(tag => !selectedIds.includes(tag.id));
}
