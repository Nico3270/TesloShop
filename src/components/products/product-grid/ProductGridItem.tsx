"use client";

import { Product } from "@/interfaces/product.interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
// Puedes agregar más iconos de redes sociales aquí
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { ProductImage } from "@/components/product/product-image/ProductImage";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  const handleWhatsAppClick = () => {
    // Redirige al número específico con un mensaje predefinido
    window.open(
      `https://wa.me/573182293083?text=Hola%20quiero%20más%20información%20sobre%20el%20producto%20${product.title}%20${window.location.origin}/product/${product.slug}`,
      "_blank"
    );
  };

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <div
          className="w-full h-500 overflow-hidden"
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        >
          <ProductImage
            src={displayImage}
            alt={product.title}
            className="w-full h-full  rounded"
            width={400}
            height={400}
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-800" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">$ {product.price}</span>

        {/* Caja de iconos debajo del texto */}
        <div className="mt-4 p-2 bg-gray-200 rounded-md flex justify-center space-x-6">
          <button
            onClick={handleWhatsAppClick}
            className="text-green-500 hover:text-green-700"
            aria-label="Compartir en WhatsApp"
          >
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </button>
          {/* Agregar otros iconos aquí */}
          <button
            className="text-blue-600 hover:text-blue-800"
            aria-label="Compartir en Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} size="2x" />
          </button>
          <button
            className="text-blue-400 hover:text-blue-600"
            aria-label="Compartir en Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </button>
          <button
            className="text-pink-600 hover:text-pink-800"
            aria-label="Compartir en Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};
