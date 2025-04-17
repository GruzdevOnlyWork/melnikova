import { cn } from '@/shared/lib/utils';
import { ArrowUp, ArrowUpDown } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className}) => {
  return <div className={cn('inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer', className)}>
      <ArrowUpDown size={16}></ArrowUpDown>
      <b className='font-semibold'>Сортировка: </b>
      <b className='text-primary font-semibold'>Популярное</b>
  </div>;
};
