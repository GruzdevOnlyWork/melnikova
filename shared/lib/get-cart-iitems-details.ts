import { Ingredient } from "@prisma/client";
import { CakeSize } from "../constans/cake";
import { CartStateItem } from "./get-cart-details";

export const getCartItemsDetails = (
    cakeSize:CakeSize,
    ingredients: CartStateItem['ingredients'],
) => {
    const details = [];

    if (cakeSize) {
      details.push(` ${cakeSize} `);
    }
  
    if (ingredients) {
      details.push(...ingredients.map((ingredient) => ingredient.name));
    }

    return details.join(', ');
}