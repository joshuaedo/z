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
import { User2, Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { SearchResults } from '@/types/search';
import Loader from './Loader';

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
      // console.log(data);
      return data as SearchResults;
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
      className='rounded-lg border max-w-lg z-50 overflow-visible h-fit relative'
    >
      <CommandInput
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className='outline-none border-none focus focus:border-none focus:outline-none ring-0'
        placeholder='Search Z...'
      />
      {input.length > 0 && (
        <CommandList className='absolute top-full inset-x-0 bg-white dark:bg-[#000000] shadow dark:border border-[#333333] rounded-b-md'>
          {isFetching && <Loader />}
          {isFetched && !queryResults && (
            <CommandEmpty className='p-3 text-sm font-medium'>
              No results found.
            </CommandEmpty>
          )}
          {isFetched && (
            <>
              {Array.isArray(queryResults) ? (
                <CommandEmpty className='p-3 text-sm font-medium'>
                  No results found.
                </CommandEmpty>
              ) : (
                <div className=''>
                  <CommandGroup heading='Communities'>
                    {queryResults?.communities.map((community) => (
                      <CommandItem
                        onSelect={(e) => {
                          router.push(`/z/${e}`);
                          router.refresh();
                        }}
                        key={community.id}
                        value={community.name}
                      >
                        <Users className='mr-2 h-4 w-4' />
                        <a className='w-full' href={`/z/${community.name}`}>
                          z/{community.name}
                        </a>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandGroup heading='Users'>
                    {queryResults?.users.map((user) => (
                      <CommandItem
                        onSelect={(e) => {
                          router.push(`/u/${e}`);
                          router.refresh();
                        }}
                        key={user.id}
                        value={user.username}
                      >
                        <User2 className='mr-2 h-4 w-4' />
                        <a className='w-full' href={`/u/${user.username}`}>
                          u/{user.username}
                        </a>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              )}
            </>
          )}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
