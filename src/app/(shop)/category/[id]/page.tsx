import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


interface Props {
    params:{
        id:string
    }
};


export default function CategoryPage({params}: Props) {
    const {id} = params;
    const products = initialData.products.filter(product => product.gender === id);
    if(id === "kids"){
        notFound();
    };
    let categoria = "";
    switch(id){
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
        categoria = "desconocido"
    };

  return (
    <div>
      <Title title={`Artículos para ${categoria}`} subtitle={"Todos los productos"}/>
      <ProductGrid products={products}/>
    </div>
  );
}
