import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { MdPlaylistRemove } from "react-icons/md";

export default function CheckoutPage() {
  const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
  ];
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar orden" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajstar elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
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
                  <p>{product.title} x 3</p>
                  <p>$ {product.price} x 3</p>
                  <p className="font-bold">Subtotal: $ {product.price * 3}</p>
                  
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden*/}
          <div className="bg-white rounded-xl shadow-xl p-7 ml-10">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-1">
              <p className="text-xl">Cristian Nicolás Rodríguez</p>
              <p className="font-bold">Carrera 9A # 7-03 sur</p>
              <p className="">Tunja</p>
              <p className="">Colombia </p>
              <p className="">Telefono: 3182293083 </p>
              <p className="">Colombia </p>
            </div>

            {/* Línea de división */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

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
              <p className="mb-5">
                <span className="text-xs">
                Al hacer click en Colocar orden, aceptas nuestros <a href="#" className="underline">terminos y condiciones de uso</a> y <a  href="#" className="underline">nuetra política de privacidad</a>
                </span>
              </p>
              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
