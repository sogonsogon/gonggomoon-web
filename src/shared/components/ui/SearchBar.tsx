'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

interface SearchBarProps {
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export default function SearchBar({
  placeholder = '공고명을 검색하세요',
  debounceMs = 180,
  className,
}: SearchBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('search') ?? '';

  const [inputValue, setInputValue] = useState(currentSearch);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isComposingRef = useRef(false);
  const latestValueRef = useRef(currentSearch);
  const latestPathnameRef = useRef(pathname);
  const latestSearchParamsRef = useRef(searchParams.toString());

  const hasSearch = inputValue.trim().length > 0;

  useEffect(() => {
    latestPathnameRef.current = pathname;
    latestSearchParamsRef.current = searchParams.toString();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handlePopState = () => {
      const nextSearch = new URLSearchParams(window.location.search).get('search') ?? '';
      latestValueRef.current = nextSearch;
      setInputValue(nextSearch);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const clearDebounce = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  };

  const replaceSearch = (rawValue: string) => {
    const trimmedValue = rawValue.trim();
    const currentPathnameValue = latestPathnameRef.current;
    const currentSearchParamsValue = latestSearchParamsRef.current;

    const params = new URLSearchParams(currentSearchParamsValue);

    if (trimmedValue) {
      params.set('search', trimmedValue);
    } else {
      params.delete('search');
    }

    const nextQueryString = params.toString();
    const nextUrl = nextQueryString
      ? `${currentPathnameValue}?${nextQueryString}`
      : currentPathnameValue;

    router.replace(nextUrl, { scroll: false });
  };

  const scheduleReplace = () => {
    clearDebounce();

    debounceRef.current = setTimeout(() => {
      replaceSearch(latestValueRef.current);
    }, debounceMs);
  };

  const handleImmediateSearch = () => {
    clearDebounce();
    replaceSearch(latestValueRef.current);
  };

  const handleClear = () => {
    clearDebounce();

    latestValueRef.current = '';
    setInputValue('');
    replaceSearch('');

    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'flex w-[min(26.25rem,calc(100vw-2rem))] max-w-full items-center gap-2.5 rounded-full bg-gray-100 px-5 py-2.5 max-md:gap-2 max-md:px-4 max-md:py-2',
        className,
      )}
    >
      <button type="button" onClick={handleImmediateSearch} aria-label="검색" className="shrink-0">
        <Search className="h-4.5 w-4.5 text-gray-500 max-md:h-4 max-md:w-4" />
      </button>

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(event) => {
          const nextValue = event.target.value;
          latestValueRef.current = nextValue;
          setInputValue(nextValue);
          scheduleReplace();
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !isComposingRef.current) {
            handleImmediateSearch();
          }
        }}
        onCompositionStart={() => {
          isComposingRef.current = true;
        }}
        onCompositionEnd={(event) => {
          isComposingRef.current = false;

          const nextValue = event.currentTarget.value;
          latestValueRef.current = nextValue;
          setInputValue(nextValue);
          scheduleReplace();
        }}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none max-md:text-[13px]"
      />

      <div className="flex w-4 items-center justify-center">
        <button
          type="button"
          onClick={handleClear}
          aria-label="검색어 지우기"
          className={`rounded-full p-0.5 text-gray-400 transition-all duration-150 cursor-pointer hover:bg-gray-200 hover:text-gray-600 ${
            hasSearch
              ? 'pointer-events-auto scale-100 opacity-100'
              : 'pointer-events-none scale-90 opacity-0'
          }`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
