'use client'
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Input } from '../ui';
import { FilterCheckbox } from './filter-checkbox';
import { Title } from './title';
import {RangeSlider} from '../ui';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import qs from 'qs';
import { useRouter} from 'next/navigation';
import { useIngredinets } from '@/shared/hooks/use-ingredients';
import { useFilters } from '@/shared/hooks/use-filters';
import { useQueryFilters } from '@/shared/hooks/use-route-filters-query';





interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className}) => {
    const router = useRouter();
    const {ingredients,setIngredients} = useIngredinets();
    const items = setIngredients;
    const updatePrices = (prices: number[]) =>{
        filters.SetPrices('priceFrom' , prices[0])
        filters.SetPrices('priceTo' , prices[1])
    }
    const filters = useFilters()

    useQueryFilters(filters);
    
    return <div className={cn('', className)}>
    <Title text = "Фильтрация" size='sm' className='mb-5 font-bold'></Title>


    <div className='mt-5 border-y birder-y-neuteral-100 py-5 pb-6' >
        <span className='font-semibold mb-5'>Цена от-до</span>
        <div className='flex gap-3 mt-2 mb-4'>
            <Input type = "number" placeholder="0" min={0} max = {3500} value={String(filters.prices.priceFrom)} 
            onChange={(e) => filters.SetPrices('priceFrom' , Number (e.target.value))}></Input>
            <Input type = "number" placeholder="3500" min={100} max = {3500 } value={String(filters.prices.priceTo)}
             onChange={(e) => filters.SetPrices('priceTo' , Number (e.target.value))}></Input>
        </div>
        <RangeSlider min={100} max = {3500} step = {10} value ={[filters.prices.priceFrom || 0, filters.prices.priceTo || 3500]} 
        onValueChange={updatePrices}
        ></RangeSlider>
    </div>
    <CheckboxFiltersGroup title={'Ингредиенты'} items={ingredients.map((item) => ({ value: String(item.id), text: item.name }))}
     defaultItems={(ingredients.map((item) => ({ value: String(item.id), text: item.name }))).slice(0,6)} limit={6} name='ingredients' onClickCheckbox={filters.setSelectedIds} selectedIds = {filters.selectedIds} >
        
    </CheckboxFiltersGroup>
    
</div>;
};