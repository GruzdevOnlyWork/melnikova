import { cn } from '@/shared/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';
import { Title } from './title';
import { Ingredient } from '@prisma/client';

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
    className?: string;
    ingredients: Ingredient[];
  }

export const ProductCard: React.FC<Props> = ({id,name,price,imageUrl, className,ingredients}) => {
  return <div className={className}>
    <Link href={`/products/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
            <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>
        <Title text = {name} size="sm" className = "mb-1 mt-3 font-semibold" ></Title>
        <p className="text-sm text-gray-400">
            {ingredients.map((ingredient) => ingredient.name).join(', ')}   
        </p>

        <div className ="flex justify-between items-center mt-4">

            <span className='text-[20px]'>
                от <b>{price}р.</b>
            </span>
            <Button variant = "secondary" className = "text-base dont-semibold">
                <Plus className='w-5 h-5 me-1'></Plus>
                Добавить
            </Button>
        </div>
    </Link>
    
</div>;
};
