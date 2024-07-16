"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./slideshow.css"

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#000',
          '--swiper-pagination-color': '#000',
          width: "100vw",
          height: "500px"
        } as React.CSSProperties
      }
        navigation={true}
        pagination
        autoplay = {{delay:5000, disableOnInteraction:false}}
        modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {
          images.map(image=> (

              <SwiperSlide key={image}>
                <Image className="object-fill" width={600} height= {500} alt={title} src={`/products/${image}`}/>
              </SwiperSlide>

          ))
        }
       
      </Swiper>
      
    </div>
  );
};
