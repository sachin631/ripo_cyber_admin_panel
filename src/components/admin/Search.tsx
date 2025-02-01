'use client'
import React, { useState, useMemo } from 'react';

const SearchBar = ({ setSearchKey }:any) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearchKey = useMemo(() => {
    const handler = setTimeout(() => {
      setSearchKey(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, setSearchKey]);

  return (
    <input
      type="text"
      placeholder="Search"
      value={inputValue}
      className="border outline-none border-gray-400 rounded-md py-2 px-4"
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default SearchBar;