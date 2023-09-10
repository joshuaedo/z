'use client';

import React, { FC, useState } from 'react';
import { Command, CommandInput } from './Command';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Community, Prisma } from '@prisma/client';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>('');

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];

      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as Community & {
        _count: Prisma.CommunityCountOutputType;
      };
    },
    queryKey: ['search-query'],
    enabled: false,
  });

  return (
    <Command className='rounded-lg border max-w-lg z-50 overflow-visible h-fit'>
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
        }}
        className='outline-none border-none focus focus:border-none focus:outline-none ring-0'
        placeholder='Explore'
      />
    </Command>
  );
};

export default SearchBar;
