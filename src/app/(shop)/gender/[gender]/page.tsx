export const revalidate = 60; //60 segundos

import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Title } from "@/components/ui/title/Title";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    gender:string
  },

  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({searchParams, params}:Props) {
    const {gender} = params;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const generos = ["men", "women", "kid", "unisex"];
    if(!generos.includes(gender)){
      redirect("/")
    }
    
    const {products, currentPage, totalPages} = await getPaginatedProductsWithImages({gender, page});

    if (products.length === 0) {
      redirect(`/gender/${ gender }`);
    };

    if(gender === "kids"){
        notFound();
    };
    let categoria = "";
    switch(gender){
      case "men":
        categoria = "hombre";
        break;
      case "women":
        categoria = "mujeres";
        break;
      case "kid":
        categoria = "niños"
        break;
        case "unisex":
          categoria = "estilo unisex"
          break;
      default:
        categoria = "desconocido";
    };

  

  return (
    <div>
      <Title title={`Artículos para ${categoria}`} subtitle={"Todos los productos"}/>
      <ProductGrid products={products}/>
      <Pagination totalPages={totalPages}/>
    </div>
  );
}
