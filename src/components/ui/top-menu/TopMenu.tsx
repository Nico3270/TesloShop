"use client";

import { titleFont } from "@/config/fonts";
import { useCarStore } from "@/store/cart/cart-store";
import { useUIStore } from "@/store/ui/ui-store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);
  const totalItemsInCart = useCarStore((state) => state.getTotalItems());
  const openMenu = useUIStore((state) => state.openSideMenu);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
    
    
      return () => {
        setLoaded(true)
      }
    }, []);
    

  return (
    <nav className="flex px-5 justify-between items-center w-full fixed top-0 left-0 z-50 bg-white shadow-md mb-10 h-fit">
      {/* Logo de la página principal */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold ml-2`}>
            Teslo
          </span>
          <span>| Shop </span>
        </Link>
      </div>

      {/* Links para dirigir a página de hombres, mujeres y niños */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          href="/gender/kid"
        >
          Niños
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          href="/gender/unisex"
        >
          Unisex
        </Link>
      </div>

      {/* Iconos de busqueda, carro y menu */}
      <div className="flex items-center mx-2">
        <Link href="/search" className="mx-2">
          {" "}
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="mx-2">
          <div className="relative">
            {loaded && totalItemsInCart > 0 && (
              <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}

            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button onClick={openMenu} className="m-2 p-2">
          Menú
        </button>
      </div>
    </nav>
  );
};
