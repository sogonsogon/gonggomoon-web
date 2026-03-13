'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/cn';

const MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

interface MonthYearPickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

export default function MonthYearPicker({
  value,
  onChange,
  placeholder = 'YYYY.MM',
  className,
}: MonthYearPickerProps) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? new Date().getFullYear());

  const handleMonthSelect = (monthIndex: number) => {
    onChange(new Date(viewYear, monthIndex, 1));
    setOpen(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setViewYear(value?.getFullYear() ?? new Date().getFullYear());
    }
    setOpen(next);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            'w-40 justify-between px-3 text-[13px] font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <span>{value ? formatDisplay(value) : placeholder}</span>
          <CalendarIcon className="h-3.5 w-3.5 text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-3" align="start">
        {/* Year navigation */}
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setViewYear((y) => y - 1)}
            className="rounded p-1 hover:bg-gray-100"
            aria-label="이전 연도"
          >
            <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
          </button>
          <span className="text-[13px] font-semibold text-gray-800">{viewYear}년</span>
          <button
            type="button"
            onClick={() => setViewYear((y) => y + 1)}
            className="rounded p-1 hover:bg-gray-100"
            aria-label="다음 연도"
          >
            <ChevronRightIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-4 gap-1">
          {MONTHS.map((label, i) => {
            const isSelected =
              value !== null && value.getFullYear() === viewYear && value.getMonth() === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleMonthSelect(i)}
                className={cn(
                  'rounded-md py-1.5 text-[12px] font-medium transition-colors',
                  isSelected ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100',
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function formatDisplay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}.${month}`;
}
