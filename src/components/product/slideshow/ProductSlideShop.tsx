"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {Swiper as SwiperObject} from "swiper";
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "./slideshow.css"
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShop = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  return (
    <div className={className}>
      <Swiper
      //   style={{
      //     '--swiper-navigation-color': '#000',
      //     '--swiper-pagination-color': '#000',
      //   } as React.CSSProperties
      // }
        spaceBetween={10}
        navigation={true}
        autoplay = {{delay:5000, disableOnInteraction:false}}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper: null }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map(image=> (

              <SwiperSlide key={image}>
                <Image className="rounded-lg object-fill" width={1024} height= {800} alt={title} src={`/products/${image}`}/>
              </SwiperSlide>

          ))
        }
       
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={2}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper"
      >
        {
          images.map(image=> (

            <SwiperSlide key={image}>
              <Image className="rounded-lg object-fill" width={300} height= {3000} alt={title} src={`/products/${image}`}/>
            </SwiperSlide>

        ))
        }
        
      </Swiper>
    </div>
  );
};
