import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdPlaylistRemove } from "react-icons/md";

export default function CartPage() {
  const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
  ];

    
  // redirect ("/empty")

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continuar comprando
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  alt={product.title}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>$ {product.price}</p>
                  <QuantitySelector quantity={3} />
                  <div className="flex">
                    <MdPlaylistRemove size={30} className="mt-3 mr-5"/>
                    <button className="underline mt-3 hover:text-red-600">Remover</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden*/}
          <div className="bg-white rounded-xl shadow-xl p-7 ml-10 h-fit">
            <h2 className="text-2xl mb-2"> Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>Número de producto</span>
              <span className="text-right">3 artículos</span>

              <span>Sutotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 25</span>

              <span className="mt-5 text-2xl text-blue-600 font-bold">
                Total
              </span>
              <span className="mt-5 text-2xl text-right text-blue-600 font-bold">
                $ 25
              </span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
