$(function(){

} );

var Shablon = function (obj) {
    this.obj = obj;


    this.init();
};
Shablon.prototype = {
    init: function () {
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function () {
        var self = this;

        return {
            addEvents: function () {

            },
            build: function () {
                self.core.addEvents();
            }
        };
    }
};

$(window).on({
    load: function () {
        var myMap;
        ymaps.ready(init); // Ожидание загрузки API с сервера Яндекса
        function init () {
            myMap = new ymaps.Map("map", {
                center: [55.76, 37.64], // Координаты центра карты
                zoom: 10 // Zoom
            });
        }
    }
});
