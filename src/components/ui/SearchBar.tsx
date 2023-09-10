'use client';

import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './Command';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Community, Prisma } from '@prisma/client';
import { Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(commandRef, () => {
    setInput('');
  });

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];

      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Community & {
        _count: Prisma.CommunityCountOutputType;
      })[]
    },
    queryKey: ['search-query'],
    enabled: false,
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInput('');
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className='rounded-lg border max-w-lg z-50 overflow-visible absolute'
    >
      <CommandInput
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className='outline-none border-none focus focus:border-none focus:outline-none ring-0'
        placeholder='Explore'
      />

      {input.length > 0 && (
        <CommandList className='absolute bg-white top-full inset-x-0 shadow rounded-b-md'>
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading='Communities'>
              {queryResults?.map((community) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/z/${e}`);
                    router.refresh();
                  }}
                  key={community.id}
                  value={community.name}
                >
                  <Users className='mr-2 h-4 w-4' />
                  <a href={`/z/${community.name}`}>z/{community.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
