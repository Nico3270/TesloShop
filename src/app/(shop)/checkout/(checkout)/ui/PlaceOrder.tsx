"use client";

import { placeOrder } from "@/actions/order/place-order";
import { useAddressStore } from "@/store/address/address-store";
import { useCarStore } from "@/store/cart/cart-store";
import { currencyFormar } from "@/utils/currencyFormat";
import clsx from "clsx";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

export const PlaceOrder = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { itemsInCart, subtotal, total, tax } = useCarStore((state) =>
    state.getSummaryInformation()
  );

  const address = useAddressStore((state) => state.address);
  const cart = useCarStore((state) => state.cart);
  const clearCart = useCarStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    // console.log({address});

    // console.log({productsToOrder});

    // Server action
    const resp = await placeOrder(productsToOrder, address);
    console.log({resp});
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    // Tod salio bien - 1. Limpiar el carrito, 2. Redireccionar a la persona

    clearCart();
    router.replace("/orders/" + resp.order?.id);
  };

  if (!loaded) return <p> Cargando......</p>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 ml-10">
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-1">
        <p className="text-xl">{`${address.firstName} ${address.lastName}`}</p>
        <p className="font-bold">{address.address}</p>
        <p className="">
          {address.city}, {address.country}
        </p>
        <p className="">{`Telefono ${address.phone}`} </p>
        <p className="">{`Código postal: ${address.postalCode}`} </p>
      </div>

      {/* Línea de división */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

      <h2 className="text-2xl mb-2"> Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>Número de producto</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormar(subtotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormar(tax)}</span>

        <span className="mt-5 text-2xl text-blue-600 font-bold">Total</span>
        <span className="mt-5 text-2xl text-right text-blue-600 font-bold">
          {currencyFormar(total)}
        </span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer click en Colocar orden, aceptas nuestros{" "}
            <a href="#" className="underline">
              terminos y condiciones de uso
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              nuetra política de privacidad
            </a>
          </span>
        </p>
        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          // href="/orders/123"
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
