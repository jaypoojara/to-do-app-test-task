import { Dispatch, SetStateAction, useState } from 'react';
import { useDebounce } from './useDebounce';

/**
 * ? useSearch hook which help to get debounce and regular state at once
 * @returns [debounceSearchText, setterFunc, searchText]
 */
export function useSearch(): [
  string,
  Dispatch<SetStateAction<string>>,
  string,
] {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);

  return [debouncedSearchText, setSearchText, searchText];
}
