"use client";

import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { useCarStore } from "@/store/cart/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdPlaylistRemove } from "react-icons/md";

export const ProductsInCart = () => {
  const udpadateProductQuantity = useCarStore((state) => state.updateProductQuantity);
  const removeProductInCart = useCarStore((state) => state.removeProduct);
  const productsInCart = useCarStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading ......</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
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
            <Link 
            className = "hover: underline cursor-pointer"
            href={`product/${product.slug}`}>
               <p>{`${product.size} - ${product.title}`}</p>
            </Link>
            <p>$ {product.price}</p>
            <QuantitySelector
              onQuantityChanged={(quantity) => udpadateProductQuantity(product, quantity)}
              quantity={product.quantity}
            />
            <div className="flex">
              <MdPlaylistRemove size={30} className="mt-3 mr-5" />
              <button 
              onClick={()=> removeProductInCart(product)}
              className="underline mt-3 hover:text-red-600">
                Remover
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
