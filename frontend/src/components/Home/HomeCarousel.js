import React from 'react';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const dataCarousel = [
  {
    image:
      'https://res.cloudinary.com/dnkhiiz0b/image/upload/v1669402562/papaya-shop/online-book-store-banner-template_23-2149043261_r2fwlk.webp',
    subtitle: "tSUMMER '21",
    title: 'Áo Thun Ngày Hè',
    position: 'left',
  },
  {
    image:
      'https://res.cloudinary.com/dnkhiiz0b/image/upload/v1669402683/papaya-shop/bookstore-banner-template_23-2148741738_mflyvj.webp',
    subtitle: '50% OFF',
    title: 'Váy Cocktail Mới',
    position: 'right',
  },
  {
    image:
      'https://res.cloudinary.com/dnkhiiz0b/image/upload/v1669402562/papaya-shop/banner-bookstore-ad-template_23-2148680419_yxmlmi.webp',
    subtitle: "LIMITED",
    title: 'Limited Collection',
    position: 'left',
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
            <div
              className={`carousel__banner carousel__banner--${slide.position}`}
            >
              <div className='banner__subtitle'>{slide.subtitle}</div>
              <h2 className='banner__title'>{slide.title}</h2>
              <Button
                to='/shop'
                component={RouterLink}
                size='small'
                variant='outlined'
                color='secondary'
                className='banner__link'
              >
                MUA NGAY
              </Button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
