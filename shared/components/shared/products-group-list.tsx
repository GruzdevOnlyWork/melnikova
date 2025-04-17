'use client'

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ProductCard } from './product-card';
import { Title } from './title';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';

import { ProductWithRelations } from '@/app/@types/prisma';

interface Props {
    title: string;
    products: ProductWithRelations[];
    className?: string;
    listClassName?: string;
    categoryId: number;
  }


export const ProductsGroupList: React.FC<Props> = ({
    title,
    products,
    listClassName,
    categoryId,
    className,
  }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,});
  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting , title, categoryId]);
  return <div className={className} id = {title} ref = {intersectionRef}>
    <Title text = {title} size = "lg" className="font-bold mb-5"></Title>
    <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
    {products.map((product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.items[0].price}
              ingredients={product.ingredients}
            />
          ))}
    </div> 
</div>;
};
