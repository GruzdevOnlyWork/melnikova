import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useSet } from "react-use";


interface PriceProps{
    priceFrom?: number;
    priceTo?: number;
    
}

export interface QueryFilters extends PriceProps {
    ingredients:string;
    sizes:string;
}

export interface Filters {
    selectedIds:Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters{
    SetPrices: (name: keyof PriceProps, value: number) => void
    setIngredients: (Value:string) => void
    setSelectedIds : (Value:string) => void
}

export const useFilters = (): ReturnProps =>{

    const searchParams = useSearchParams() as unknown as Map <keyof QueryFilters , string>;
    const [selectedIds , {toggle: toogleIngredients}] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));
    const [price , setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined ,
        priceTo: Number(searchParams.get('priceTo')) || undefined ,

    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) =>({
            ...prev,
            [name]:value,
        }))
    }
    
    const setSelectedIds = (value: string) => {
        toogleIngredients(value);
    };

    return React.useMemo(()=>({
        selectedIds,
        prices: price, 
        SetPrices: updatePrice,
        setIngredients: toogleIngredients,
        setSelectedIds, 
    }),[selectedIds,
        price, 
        setPrices ]);
}
