import React from 'react';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const dataCarousel = [
  {
    image:
      'https://res.cloudinary.com/detabvdku/image/upload/v1651072486/brooke-cagle-z1B9f48F5dc-unsplash_d291ga.jpg',
    subtitle: "Mùa hè 2022",
    title: 'Thiết kế mới',
    position: 'left',
  },
  {
    image:'https://res.cloudinary.com/detabvdku/image/upload/v1651072829/tamara-bellis-wYwQMrLBbXI-unsplash_rh3mzx.jpg',
    subtitle: 'Giảm 50%',
    title: 'Dạo phố cuối tuần',
    position: 'right',
  },
  {
    image:
    'https://res.cloudinary.com/detabvdku/image/upload/v1651072830/charles-fair-XpY5guPssSI-unsplash_lhnjxn.jpg',
    subtitle: "Xuân/Hạ 2022",
    title: 'Tự tin thể hiện',
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
                Mua ngay
              </Button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
