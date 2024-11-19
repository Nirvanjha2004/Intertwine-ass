import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';

interface Searchable {
  [key: string]: any;
}

export function useSearch<T extends Searchable>(
  items: T[],
  keys: string[],
  options?: Fuse.IFuseOptions<T>
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<T[]>(items);

  const fuse = useMemo(
    () => new Fuse(items, {
      keys,
      threshold: 0.3,
      ...options,
    }),
    [items, keys, options]
  );

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(items);
    } else {
      const results = fuse.search(searchQuery);
      setSearchResults(results.map(result => result.item));
    }
  }, [searchQuery, items, fuse]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults
  };
} 