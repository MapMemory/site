import React, { useRef } from 'react';
import Swiper from 'react-id-swiper';

import '../../styles/pages/components/swiper.scss';
import '../../styles/pages/components/simpleSlider.scss';

export default ({ person, imgsUrl }) => {
    const colorParams = {
        observer: true,
        observeParents: true,
        loop: true,
        spaceBetween: 10,
        slidesPerView: 1,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        paginationClickable: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: null,
            prevEl: null
        },
        renderPrevButton: () => <button style={{
            color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().backgoundColorFirst.backgroundColor
        }} className="swiper-button-prev" onClick={goPrev}>{'<'}</button>,
        renderNextButton: () => <button style={{
            color: person.getThemeColors().text.color, backgroundColor: person.getThemeColors().backgoundColorFirst.backgroundColor
        }} className="swiper-button-next" onClick={goNext}>{'>'}</button>,
    };

    let swiperRef = useRef(null);

    const goNext = () => {
        if (swiperRef.current !== null && swiperRef.current.swiper !== null) {
            swiperRef.current.swiper.slideNext();
        }
    }

    const goPrev = () => {
        if (swiperRef.current !== null && swiperRef.current.swiper !== null) {
            swiperRef.current.swiper.slidePrev();
        }
    }

    if (person.getThemeTone() === 'light') {
        colorParams.navigation.nextEl = '.swiper-button-next.swiper-button-black';
        colorParams.navigation.prevEl = '.swiper-button-prev.swiper-button-black';
    }

    if (person.getThemeTone() === 'dark') {
        colorParams.navigation.nextEl = '.swiper-button-next';
        colorParams.navigation.prevEl = '.swiper-button-prev';
    }

    return (
        <div id="boxImgs">
            <Swiper {...colorParams} ref={swiperRef}>
                {
                    imgsUrl.map((imgUrl) => <img src={imgUrl} />)
                }
            </Swiper>
        </div >
    );
}