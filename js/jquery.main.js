( function(){
    var popup = null;

    $( function(){
        $('.popup').each(function(){
            popup = new Popup($(this));
        });
        $('.map').each(function () {
            var myMap;
            function init () {
                myMap = new ymaps.Map('map', {
                    center: $('.map').attr('data-coord').split(', '),
                    zoom: 12
                });
                myMap.controls
                    .add('zoomControl', { left: 5, top: 5 })
                    .add('typeSelector')
                    .add('mapTools', { left: 35, top: 5 });
            }
            ymaps.ready(init);
        });
        $('.swiper-container').each(function () {
            Slider($(this));
        });
        $('input[id=phone]').each(function () {
            Mask($(this));
        });
        $('input[id=callback__phone]').each(function () {
            Mask($(this));
        });
        $('#callback-popup__send').click(function(){
            $.ajax( {
                url: 'php/form.php',
                dataType: 'html',
                timeout: 20000,
                type: "GET",
                data: {name:$('#callback__name').val(), phone:$('#callback__phone').val(),
                    time:$('#callback__time').val(), email:$('#callback__email').val()},
                success: function( msg ){
                    popup.core.show('thanks');
                    setTimeout( function(){
                        popup.core.hide('thanks')
                    }, 3000 );
                },
                error: function( XMLHttpRequest ){
                    if( XMLHttpRequest.statusText != "abort" ){
                        alert( XMLHttpRequest.statusText );
                    }
                }
            } );
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
                _obj.inputmask("+7 ( 999 ) 999 - 99 - 99", ({ promptChar: "." }));
            },
            _init = function () {
                _addEvents();
            };

        //public properties

        //public methods


        _init();
    };

    var Popup = function( obj ){
        this.popup = obj;
        this.btnShow = $('.popup__open');
        this.btnClose = obj.find( '.popup__close, .popup__cancel' );
        this.wrap = obj.find($('.popup__wrap'));
        this.contents = obj.find($('.popup__content'));
        this.window = $( window );
        this.scrollConteiner = $( 'html' );
        this.timer = setTimeout( function(){},1 );

        this.init();
    };
    Popup.prototype = {
        init: function(){
            var self = this;
            self.core = self.core();
            self.core.build();
        },
        core: function (){
            var self = this;

            return {
                build: function (){
                    self.core.controls();
                },
                centerWrap: function(){
                    if ( self.window.height() - 80 - self.wrap.height() > 0 ) {
                        self.wrap.css({top: ( ( self.window.height() -80 )- self.wrap.height())/2});
                    } else {
                        self.wrap.css({top: 0});
                    }
                },
                controls: function(){
                    self.window.on( {
                        resize: function(){
                            self.core.centerWrap();
                        }
                    } );
                    $('body').on( 'click','.popup__open', function(){
                        var curItem = $( this),
                            parentDropdown = curItem.parents(".dropdown"),
                            linkDropdown = parentDropdown.find("a[data-toggle=dropdown]");
                        parentDropdown.removeClass("open");
                        linkDropdown.attr("aria-expanded", "false");
                        self.core.show( curItem.attr( 'data-popup' ) );
                        popup.btnClose = self.popup.find(".popup__close");
                        return false;
                    } );
                    self.wrap.on( {
                        click: function( event ){
                            event = event || window.event;

                            if (event.stopPropagation) {
                                event.stopPropagation();
                            } else {
                                event.cancelBubble = true;
                            }
                        }
                    } );
                    self.popup.on( {
                        click: function(){
                            self.core.hide();
                            return false;
                        }
                    } );
                    self.btnClose.on( {
                        click: function(){
                            self.core.hide();
                            return false;
                        }
                    } );
                },
                hide: function(){
                    self.popup.css ({
                        'overflow-y': "hidden"
                    });
                    self.scrollConteiner.css( {
                        paddingRight: 0
                    } );
                    self.popup.removeClass('popup_opened');
                    self.popup.addClass('popup_hide');
                    location.hash = '';
                    setTimeout( function(){
                        self.popup.removeClass('popup_hide');
                    }, 300 );

                },
                getScrollWidth: function (){
                    var scrollDiv = document.createElement("div");
                    scrollDiv.className = "popup__scrollbar-measure";
                    document.body.appendChild(scrollDiv);
                    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                    document.body.removeChild(scrollDiv);
                    return scrollbarWidth;
                },
                show: function( className ){
                    self.core.setPopupContent( className );
                    self.scrollConteiner.css( {
                        paddingRight: self.core.getScrollWidth()
                    } );
                    self.popup.addClass('popup_opened');
                    self.core.centerWrap();
                    $('.popup_opened').find('textarea').focus();
                },
                setPopupContent: function( className ){
                    self.contents = self.popup.find('.popup__content');
                    var curContent = self.contents.filter( '.popup__' + className );
                    self.contents.css( { display: 'none' } );
                    curContent.css( { display: 'block' } );
                }

            };
        }
    };

})();

