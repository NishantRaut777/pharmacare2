import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../styles/Swiper.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import logo1 from "../assets/carousel-img-1.jpg";
import logo2 from "../assets/carousel-img-2.jpg";
import logo3 from "../assets/carousel-img-3.jpg";
import logo4 from "../assets/carousel-img-4.jpg";
// import logo5 from "../assets/carousel-img-5.jpg";
// import logo6 from "../assets/carousel-img-6.jpg";

const Carousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className='swiper-image-container-1 '></SwiperSlide>
        <SwiperSlide className='swiper-image-container-2 '></SwiperSlide>
        <SwiperSlide className='swiper-image-container-3 '></SwiperSlide>
        <SwiperSlide className='swiper-image-container-4 '></SwiperSlide>
        {/* <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  )
}

export default Carousel
