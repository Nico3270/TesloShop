"use client";

import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { CartProduct, Product, Size } from "@/interfaces/product.interface";
import { useCarStore } from "@/store/cart/cart-store";
import React, { useState } from "react"; // Asegúrate de importar useState correctamente

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCarStore(state => state.addProductTocart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCArt = () => {
    setPosted(true);
    if(!size) return;
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }
    // console.log({ size, quantity, product });
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">Debe se seleccionar una talla</span>
      )}

      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        onSizeChanged={(size) => setSize(size)}
      />

      {/* Selector de cantidad */}

      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button */}
      <button onClick={addToCArt} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
