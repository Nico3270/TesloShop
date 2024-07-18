import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductTocart: (product: CartProduct) => void;

  updateProductQuantity: (product: CartProduct, quantity:number) => void;

  removeProduct: (product: CartProduct) => void;

  getSummaryInformation: () => {
    subtotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
}
}

export const useCarStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //Metodos
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subtotal = cart.reduce( (subTotal, product) => (product.quantity * product.price) + subTotal, 0);
        const tax = subtotal * 0.15;
        const total = subtotal + tax;
        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

        return {
          subtotal, tax, total , itemsInCart
        }
      }
      ,

      addProductTocart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        };


        //2. Como ya sabe que el producto existe por talla, se debe incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const  {cart} = get();
        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id && item.size === product.size){
            return {...item, quantity:quantity};
          }
          return item;
        });

        set({cart: updatedCartProducts});
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });

      }

    }),

    {
      name: "shopping-art",
      // skipHydration: true,
    }
  )
);
