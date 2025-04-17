import { ingredients } from "@/prisma/constans";
import { Ingredient } from "@prisma/client";

export interface CartItemProps {
  id:number;
  details: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  disabled?:boolean;
}
