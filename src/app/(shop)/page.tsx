export const revalidate = 60; //60 segundos


import { Title } from "@/components/ui/title/Title";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { getPaginatedProductsWithImages } from '../../actions/products/product-pagination';
import { redirect } from "next/navigation";
import { Pagination } from "@/components/ui/pagination/Pagination";



interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({searchParams}:Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {products, currentPage, totalPages} = await getPaginatedProductsWithImages({page});

  console.log({currentPage, totalPages});
  if (products.length === 0){
    redirect("/")
  }

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-1" />
      <ProductGrid products={products}/>
      <Pagination totalPages={totalPages}/>
    </>
  );
}
