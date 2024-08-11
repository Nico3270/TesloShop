"use client";


import { useCarStore } from "@/store/cart/cart-store";
import { currencyFormar } from "@/utils/currencyFormat";
import Image from "next/image";

import { useEffect, useState } from "react";
import { MdPlaylistRemove } from "react-icons/md";

export const ProductsInCart = () => {
 
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
            <span
            // className = "hover: underline "
            // href={`product/${product.slug}`}
            >
             Talla: {product.size} - Producto: {product.title} - Cantidad: {`${product.quantity} `}
            </span>
            <p className="font-bold">
              {currencyFormar(product.price * product.quantity)}
            </p>

            {/* <p>$ {product.price}</p> */}

          
          </div>
        </div>
      ))}
    </>
  );
};
