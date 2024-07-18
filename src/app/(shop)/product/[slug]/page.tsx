export const revalidate = 604800; //7 días

import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { ProductMobileSlideShow } from "@/components/product/slideshow/ProductMobileSlideshow";
import { ProductSlideShop } from "@/components/product/slideshow/ProductSlideShop";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { getProductBySlug } from '../../../../actions/products/getproductbyslug';
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import type { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      // images: ["/some-specific-page-image.jpg", ...previousImages],
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function productBySlug({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  console.log(product);
  // const product = initialData.products.find((product) => product.slug === slug);
  if (!product) {
    return notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        {/* Slideshow mobile */}
        <ProductMobileSlideShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Slideshow escritorio */}
        <ProductSlideShop
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-xl mb-5 font-bold">$ {product.price}</p>
        {/* Selector de tallas */}

        <AddToCart product={product}/>

        {/* Descripción */}
        <h3 className="font-bold text-sm ">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>

      {/* Detalles */}
    </div>
  );
}
