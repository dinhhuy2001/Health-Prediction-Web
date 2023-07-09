import React from 'react';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import banner1 from '../img/Banner/banner1.jpg';
import banner2 from '../img/Banner/banner2.jpg';
import banner3 from '../img/Banner/banner3.jpg';
import { useTranslation } from 'react-i18next';

const Banner = () => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} pause={false}>
            <Carousel.Item>
                <img className="d-block w-100 fixed-height" src={banner1} alt="First slide" />
                <Carousel.Caption className="caption rounded-3">
                    <h3>Smarter Healthcare</h3>
                    <p>{t('home.banner2')}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 fixed-height" src={banner2} alt="Second slide" />

                <Carousel.Caption className="caption">
                    <h3>Smarter Healthcare</h3>
                    <p>{t('home.banner2')}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100 fixed-height" src={banner3} alt="Third slide" />

                <Carousel.Caption className="caption">
                    <h3>Smarter Healthcare</h3>
                    <p>{t('home.banner2')}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;
