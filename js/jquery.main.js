$(function(){
    $('.swiper-container').each(function () {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 1,
            autoplay: 5000,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            freeMode: true,
            loop: true,
            spaceBetween: 0
        })
    });
} );