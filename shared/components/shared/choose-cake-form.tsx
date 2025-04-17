import { cn } from "@/shared/lib/utils";
import { Ingredient, ProductItem} from "@prisma/client";
import React from "react";
import { CakeImage} from "./cake-image";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { Title } from "./title";
import { CakeSize, cakeSizes} from "@/shared/constans/cake";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";
import { cakeDetails} from "@/shared/lib";

interface ReturnProps {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    loading?: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    onClickAddCart?: VoidFunction;
    className?: string;

  }
export const ChooseCakeForm: React.FC<ReturnProps> = ({
    imageUrl,
    name,
    ingredients,
    items,
    loading,
    onSubmit,
    onClickAddCart,
    className,}
) =>{

    
    const [size , setSize] = React.useState<CakeSize>(2);
    const [selectedIngredients , {toggle: addIngredient}] = useSet(new Set<number>([]));
    console.log (items , ingredients ,size )
    const currentItemId = items.find((item) => item.size === size)?.id;
    const handleClickAdd = () => {
        if(currentItemId){
            onSubmit(currentItemId , Array.from(selectedIngredients))
        }
    }   
    const {totalPrice , textDetaills} = cakeDetails(items , size, ingredients,selectedIngredients);
    

    return (
        <div className={cn(className, 'flex flex-1')}>
            <CakeImage imageUrl={imageUrl} size={size}></CakeImage>
            <div className="w-[490px] bg-[#f7f6f5] p-7" >
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetaills}</p>
                <GroupVariants className="my-5" items={cakeSizes} value={String(size)} onClick = {value => setSize(Number(value) as CakeSize)}></GroupVariants>
                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-4">
                    <div className='grid grid-cols-3 gap-3'>
                        {ingredients.map((ingredients)=>(
                            <IngredientItem 
                                key={ingredients.id}
                                imageUrl={ingredients.imageUrl}
                                name={ingredients.name}
                                price={ingredients.price}
                                onClick = {() => addIngredient(ingredients.id)}
                                active = {selectedIngredients.has(ingredients.id)}>
                            </IngredientItem>
                        ))}
                    </div>
                </div>
                <Button
                    onClick={handleClickAdd}
                    loading={loading}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};