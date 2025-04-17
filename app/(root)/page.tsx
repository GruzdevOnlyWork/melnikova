import { Container , TopBar ,Title ,Filters, ProductCard, ProductsGroupList } from "@/shared/components/shared"
import { prisma } from "@/prisma/prisma-client"
import { Suspense } from "react"
import { findCakes } from "@/shared/lib"
import { GetSearchParams } from "@/shared/lib/find-cakes";


export default  async function Home({searchParams}:{searchParams: GetSearchParams}) {
    const categories = await findCakes(searchParams);
    return<>
     <Container className="mt-5">
        <Title text = "Все позиции" size = "lg" className="font-extrabold"></Title>
     </Container>
     <TopBar categories={categories.filter((category)=>category.products.length > 0)}></TopBar>
     <Container className="pb-14 mt-12">
        <div className="flex gap-[60px]">
            <div className="w-[250px]">
                <Suspense>
                    <Filters></Filters>
                </Suspense>
                
            </div>
            <div className="flex-1">
                <div className="flex flex-col gap-16">
                   {
                    categories.map((category) =>(
                        category.products.length > 0 && (
                            <ProductsGroupList 
                                key={category.id}
                                title={category.name}
                                products={category.products} 
                                categoryId={category.id}                            />
                        )
                    ))
                   }
                </div>
            </div>
        </div>
     </Container>

    </>
    
}
