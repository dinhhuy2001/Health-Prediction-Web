import React from 'react';
import introBanner from '../img/Banner/intro-banner.png';
import { useTranslation } from 'react-i18next';

const Intro = () => {
    const { t } = useTranslation();
    return (
        <div className="container overflow-hidden my-5 border bg-light shadow-lg rounded-3">
            <div className="row gy-5">
                <div className="col-12 col-md-5">
                    <div className="p-3">
                        <img className="img-fluid" src={introBanner} alt="" />
                    </div>
                </div>
                <div className="col-12 col-md-7">
                    <div className="p-3">
                        <h1 className="fw-extrabold blue-color">{t('home.why_choose')}</h1>
                        <p className="fs-5">{t('home.why_description1')}</p>
                        <p className="fs-5">{t('home.why_description2')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
