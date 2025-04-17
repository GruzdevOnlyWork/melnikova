import { Ingredient, ProductItem } from "@prisma/client";
import { CakeSize } from "../constans/cake";

/**
 * Функция для подсчета стоимости 
 * 
 * 
 * @param size  - размер
 * @param items  - вариации
 * @param ingredients  - ингредиенты общая
 * @param selectedIngredients - ингредиенты выбранные
 * @returns  возвращает общую стоимость 
 */
export const calcTotalCakePrice = (
    size: CakeSize ,
    items: ProductItem[] , 
    ingredients:Ingredient[],
    selectedIngredients: Set<number>
) => {
        const cakePrice = items.find((item) => item.size === size)?.price || 0;
        const totalIngredientsPrice = ingredients
        .filter(ingredient => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);
    
    
        return  cakePrice + totalIngredientsPrice;

}