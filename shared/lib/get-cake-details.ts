import { Ingredient, ProductItem } from "@prisma/client"
import { calcTotalCakePrice } from "./calc-total-cake-prices"
import { CakeSize, mapCakeSize } from "../constans/cake"

/**
 * 
 * @param items - вариации
 * @param size -размер
 * @param ingredients -ингредиенты
 * @param selectedIngredients  - выбранные ингредиенты
 * @returns Общею стоимость товара и строку описания выбранной позиции
 */

export const cakeDetails  = (
    items:ProductItem[] ,
    size: CakeSize,
    ingredients: Ingredient[],
    selectedIngredients: Set <number>
) =>
{
    const textDetaills =`Размер: ${mapCakeSize[size]} , ингредиенты (${selectedIngredients.size})`
    const totalPrice = calcTotalCakePrice(size,items,ingredients , selectedIngredients)

    return{totalPrice , textDetaills }
}