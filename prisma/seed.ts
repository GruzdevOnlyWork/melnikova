import { Prisma } from "@prisma/client";
import { categories , ingredients,products} from "./constans";
import { prisma } from "./prisma-client";
import {hashSync} from 'bcrypt'
import { connect } from "http2";


const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  size,
}: {
  productId: number;
  size?: number;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};


async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'UserT',
        email: "tested@test.ru",
        password: hashSync('1111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'AdminT',
        email: "admin@test.ru",
        password: hashSync('1111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ]
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  // Создание конкретных продуктов
  const cake1 = await prisma.product.create({
    data: {
      name: 'Торт "Прага"',
      imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp', // URL изображения
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const cake2 = await prisma.product.create({
    data: {
      name: 'Пирожное "Медовик"',
      imageUrl: 'https://example.com/medovik.jpg', // URL изображения
      categoryId: 2,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const cake3 = await prisma.product.create({
    data: {
      name: 'Капкейки с клубникой',
      imageUrl: 'https://example.com/kapkejki-klubnika.jpg', // URL изображения
      categoryId: 3,
      ingredients: {
        connect: ingredients.slice(10, 15),
      },
    },
  });



  await prisma.productItem.createMany({
    data: [
      // Торт "Прага"
      generateProductItem({ productId: cake1.id, size: 1 }),
      generateProductItem({ productId: cake1.id, size: 2 }),
      generateProductItem({ productId: cake1.id, size: 3 }),

      // Пирожное "Медовик"
      generateProductItem({ productId: cake2.id, size: 1 }),
      generateProductItem({ productId: cake2.id, size: 2 }),
      generateProductItem({ productId: cake2.id, size: 3 }),

      // Капкейки с клубникой
      generateProductItem({ productId: cake3.id, size: 1 }),
      generateProductItem({ productId: cake3.id, size: 2 }),
      generateProductItem({ productId: cake3.id, size: 3 }),


      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '2222222',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '1122222',
      }
    ]
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
    await prisma.$executeRaw `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw `TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw `TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw `TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw `TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw `TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw `TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;

    
}
async function main() {
    try{
        await down();
        await up();

    } catch(e){
        console.error(e)
    }
}


main()
    .then(async() =>{
    await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect();
        process.exit(1)
    })
