"use client";

import { getStockBySlug } from "@/actions/products/getStockBySlug";
import { titleFont } from "@/config/fonts";
import React, { useEffect, useState } from "react";
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  slug: string
}
 

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const inStock = await getStockBySlug(slug);
      setStock(inStock);
      setIsLoading(false);
    };
    getStock();
  },[slug] );


  return (
    <div>
      {isLoading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold text-md animated-pulse bg-blue-200`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-md`}>
          {`Stock: ${stock}`}
        </h1>
      )}
    </div>
  );
};
