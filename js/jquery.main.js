( function(){
    $( function(){
        $('.swiper-container').each(function () {
            Slider($(this));
        });
        $('input[name=phone]').each(function () {
            Mask($(this));
        });
    } );

    var Slider = function (obj) {

        //private properties
        var _self = this,
            _next = obj.find($('.swiper-button-next')),
            _prev = obj.find($('.swiper-button-prev')),
            _obj = obj;

        //private methods
        var _addEvents = function () {

            },
            _init = function () {
                _addEvents();
            };
        var swiper = new Swiper(_obj, {
            slidesPerView: 1,
            autoplay: 5000,
            nextButton: _next,
            prevButton: _prev,
            freeMode: true,
            loop: true,
            spaceBetween: 0
        });
        //public properties

        //public methods


        _init();
    };

    var Mask = function (obj) {

        //private properties
        var _self = this,
            _obj = obj;

        //private methods
        var _addEvents = function () {
                _obj.inputmask("+7(999) 999 - 99 - 99", ({ promptChar: "." }));
            },
            _init = function () {
                _addEvents();
            };

        //public properties

        //public methods


        _init();
    };

})();

