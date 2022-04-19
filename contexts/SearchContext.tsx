import React, {createContext, PropsWithChildren, useState} from 'react';

const SearchContext = createContext<{
  keyword: string;
  onChangeText(keyword: string): void;
}>({
  keyword: '',
  onChangeText(_keyword: string) {},
});

export const SearchContextProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [keyword, onChangeText] = useState('');

  return (
    <SearchContext.Provider value={{keyword, onChangeText}}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
