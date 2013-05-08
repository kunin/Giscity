jQuery(function(){
    var jQueryslider = jQuery('.slider');
    if (jQueryslider.length) {
        
        var sliderInterval = null;
        var sliderTimeout  = null;
        var changeInterval = 10000;  // Смена итемов раз в 10 секунд
        var sliderDelay    = 25000; // Ожидание после клика до запуска автосмены
        var speedFade      = 300;   // Скорость появления/скрытия шторки
        var ieFix          = false; // Если все плохо, ставим true и защита в ие срабатывает, если все хорошо, оставляем false
        
        ///////////////////////////////////////////
        // Подготовка
        ///////////////////////////////////////////
        var active = jQueryslider.find('.m-control li').index(jQueryslider.find('.m-control li.m-active'));
        if (active == -1) {
            active = 0;
            jQueryslider.find('.m-control li:eq(0)').addClass('m-active');
        }        
        
        jQueryslider.find('.m-item').hide().eq(active).addClass('m-active').show();
        
        ///////////////////////////////////////////
        // Анимация смены
        ///////////////////////////////////////////
        var sliderAnimate = function (next) {
            if (typeof(next) == 'undefined') {
                next = jQueryslider.find('.m-control li.m-active').next();
                next = next.length ? jQueryslider.find('.m-control li').index(next) : 0;
            }
            if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) <= 7 && ieFix) {
                jQueryslider.find('.m-item.m-active').removeClass('m-active').hide();
                jQueryslider.find('.m-item').eq(next).addClass('m-active').show();
                jQueryslider.find('.m-control li').removeClass('m-active').eq(next).addClass('m-active');
            } else {
                jQueryslider.find('.m-item.m-active').removeClass('m-active').fadeOut(speedFade, function(){
                    jQueryslider.find('.m-item').eq(next).addClass('m-active').fadeIn(speedFade);
                    jQueryslider.find('.m-control li').removeClass('m-active').eq(next).addClass('m-active');
                });
            }
        };
        
        /////////////////////////////////////////// 
        // Обработчики событий 
        /////////////////////////////////////////// 
        var sliderChangeClick = function(){ 
            clearInterval(sliderInterval); 
            clearTimeout(sliderTimeout); 
            sliderTimeout = setTimeout(function(){ 
                sliderInterval = setInterval(function(){sliderAnimate();}, changeInterval); 
            },sliderDelay); 

            if (jQuery(this).parent().hasClass('m-active')) return false; 

            sliderAnimate( 
                jQueryslider.find('.m-control a').index(jQuery(this)) 
            ); 
            return false; 
        };    
        
        ///////////////////////////////////////////
        // Вешаем события
        ///////////////////////////////////////////
        jQueryslider.find('.m-control a').click(sliderChangeClick);
        
        ///////////////////////////////////////////
        // Запускаем автопрокрутку
        ///////////////////////////////////////////
        sliderInterval = setInterval(function(){sliderAnimate();}, changeInterval);
    }
})
