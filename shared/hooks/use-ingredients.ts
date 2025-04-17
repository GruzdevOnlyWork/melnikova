import React from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/shared/services/api-client";



type IngredientItem = Pick <Ingredient, 'id' | 'name'>;
export const useIngredinets = () => {
    const[ingredients , setIngredients] = React.useState<IngredientItem[]>([]);
    
    React.useEffect(() => {
        async function fetchIngredients(){
            try{
                const ingredients = await Api.ingredients.getAll();
                setIngredients (ingredients.map((ingredient) => ({id:ingredient.id , name: ingredient.name})));
            } catch(error){
                console.log(error)
            }
        }
        fetchIngredients();
    }, []);

    return{ingredients , setIngredients};
}