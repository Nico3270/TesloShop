"use client";

import { useCarStore } from "@/store/cart/cart-store";
import { currencyFormar } from "@/utils/currencyFormat";
import { useEffect , useState} from "react";

export const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false);
    const {itemsInCart, subtotal, total, tax} = useCarStore(state => state.getSummaryInformation())

    useEffect(() => {
        setLoaded(true)
    },[])

    if(!loaded) return <p>Loading .....</p>

  return (
    <>
      <div className="grid grid-cols-2">
        <span>Número de producto</span>
        <span className="text-right">{`${itemsInCart} artículos`}</span>

        <span>Subtotal</span>
        <span className="text-right"> {currencyFormar(subtotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right"> {currencyFormar(tax)}</span>

        <span className="mt-5 text-2xl text-blue-600 font-bold">{currencyFormar(total)}</span>
      </div>
    </>
  );
};
