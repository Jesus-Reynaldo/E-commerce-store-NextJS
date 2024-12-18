'use client'

import {Swiper} from "swiper/react"
import { SwiperSlide } from "swiper/react"
import Image from "next/image"

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './slideshow.css';
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { ProductImage } from "../product-image/ProductImage";

interface Props{
  images: string[],
  title: string,
  className?: string
}
export const ProductMobileSlideshow = ({images, title, className}:Props) => {

  return (
    <div className={className}>
      <Swiper
        style={{
          height: "500px",
          width:"100vw"
        }}
        pagination
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
          {
            images.map(image => (
              <SwiperSlide  key={image}>
                <ProductImage
                  width = {600}
                  height= {500}
                  src={image}
                  alt={title}
                  className="object-fill"
                />
              </SwiperSlide>
            ))
          }
        
      </Swiper>
    </div>
  )
}
