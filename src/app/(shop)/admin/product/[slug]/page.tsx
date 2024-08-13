import { getProductBySlug } from "@/actions/products/getproductbyslug";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getCategories } from "@/actions/categories/get-categories";


interface Props {
    params : {
        slug:string
    }
}


export default async function ProductPage({params}:Props) {
    const {slug} = params;

    console.log({slug});

    const [product, categories] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ])

    // Todo: New
    if (!product &&  slug !== "new") {
        redirect("/admin/products")
    }

    const title = (slug === "new") ? "Nuevo producto" : "Editar producto";

  return (
    <>
        <Title title={title}/>
        <ProductForm product={product ?? {}} categories={categories}/>
    </>
  );
}