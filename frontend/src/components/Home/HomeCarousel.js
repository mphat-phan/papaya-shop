import React from 'react';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const dataCarousel = [
  {
    image:
      'https://res.cloudinary.com/dnkhiiz0b/image/upload/v1669402562/papaya-shop/online-book-store-banner-template_23-2149043261_r2fwlk.webp',
  },
  {
    image:
      'https://res.cloudinary.com/dnkhiiz0b/image/upload/v1669402683/papaya-shop/bookstore-banner-template_23-2148741738_mflyvj.webp',

  },
  {
    image:
      'https://res.cloudinary.com/dnkhiiz0b/image/upload/v1669402562/papaya-shop/banner-bookstore-ad-template_23-2148680419_yxmlmi.webp',

  },
];

const HomeCarousel = () => {
  return (
    <div>
      <Carousel
        autoPlay
        interval={5000}
        infiniteLoop
        showIndicators
        showArrows
        swipeable={false}
        showThumbs={false}
        showStatus={false}
        animationHandler='fade'
      >
        {dataCarousel.map((slide, index) => (
          <div className='carousel__slide' key={index}>
            <img src={slide.image} alt='' className='carousel__img' />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
