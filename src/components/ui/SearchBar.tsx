'use client';

import React, { FC } from 'react';
import { Command, CommandInput } from './Command';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  return (
    <Command className='rounded-lg border max-w-lg z-50 overflow-visible h-fit'>
      <CommandInput
        className='outline-none border-none focus focus:border-none focus:outline-none ring-0'
        placeholder='Explore'
      />
    </Command>
  );
};

export default SearchBar;
