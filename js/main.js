(function() {
    var SlideHTML = function (data) {
        return $('<div class="widget"'+
                    'data-title="'+data.title+'"'+
                    'data-src="'+data.src+'"'+
                    'data-source="'+data.source+'"'+
                    'data-image="'+data.image+'"'+
                    'data-date="'+data.date+'">'+
                    '<div class="widget__video clearfix">'+
                        '<div class="widget__head" style="background-image: url('+data.image+')"></div>'+
                        '<div class="widget__content">'+
                            '<div class="widget__headline">'+data.title+'</div>'+
                        '</div><!--widget__content-->'+
                    '</div><!--widget__video-->'+
                '</div><!--widget-->');
    }

    //If the css transitions of the headline are not needed, we can replace the entire module using this class
    // var VideoHTML= function (data) {
    //     return $('<div class="carousel__video" data-src="'+data.src+'">'+
    //                 '<div class="carousel-video__head" style="background-image: url('+data.image+')">'+
    //                     '<i class="fa fa-play-circle play__button"></i>'+
    //                     '<div class="carousel-video__iframe"></div>'+
    //                 '</div>'+
    //                 '<div class="carousel-video__content">'+
    //                     '<div class="video-content__headline">'+data.title+'</div>'+
    //                 '</div>'+
    //             '</div>');
    // }

    function loadSlides(videos){
        videos.forEach(function(video){
            $('.carousel__slides').append(SlideHTML(video));
        });
    }

    function updateWidgetData ( video ) {
        // $('.carousel__splash').html(VideoHTML(video)); //Using a new HTML code instead of replacing the values
        $('.carousel__video').attr('data-src', video.src);
        $('.carousel__video .carousel-video__head').css('background-image', 'url('+video.image+')');
        $('.carousel__video .video-content__headline').html(video.title);
        $('.carousel__video .carousel-video__iframe').html('');
    }

    function updateVideoData( widget ) {
        if ($('.carousel__video').attr('data-src') != widget.attr('data-src') ){
            var video = {
                "title": widget.attr('data-title'),
                "src": widget.attr('data-src'),
                "source": widget.attr('data-source'),
                "image": widget.attr('data-image'),
                "date": widget.attr('data-date')
            }

            if (device.isMobile){
                updateWidgetData( video );
                loadIframe();
            }else{
                $('.carousel__splash').removeClass('active');
                updateWidgetData( video );
            }
        }
    }

    function loadIframe() {
        var video_url= $('.carousel__video').attr('data-src');
        $('.carousel-video__iframe').html('<iframe class="video-iframe" src="'+video_url+'?rel=0&autoplay=1" frameborder="0" allowfullscreen="allowfullscreen"></iframe>');
    }

    $(document).ready(function(){
        //loading HTML slides from JSON
        loadSlides(JSON_VIDEOS);

        //Loading first video to the main splash
        updateWidgetData(JSON_VIDEOS[0]);
        //updateVideoData($('.carousel__slides .widget').first());

        $('.carousel__slides .widget').click(function(){
            updateVideoData($(this));
        }).keypress(function(e){
            e.preventDefault();
            if (e.keyCode == 13) {
               updateVideoData($(this));
            }
        });

        if (device.isMobile){
            $('.carousel__splash').addClass('active');
        }else{
            $('.carousel__splash').click(function(){
                if (!$(this).hasClass("active")) {
                    $(this).addClass("active");
                    loadIframe();
                }
            }).keypress(function(e){
                e.preventDefault();
                if ((e.keyCode == 13) && (!$(this).hasClass("active"))) {
                    $(this).addClass("active");
                    loadIframe();
                }
            });
        }

        //Initializing SlickJS
        $('.carousel__slides').on('init', function(event, slick){
            $('.video-carousel').addClass('initialized');
        })
        .slick({
            infinite: false,
            dots: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            centerMode: false,
            swipe: false,
            prevArrow: '<button type="button" class="slide__prev"><i class="fa fa-arrow-left"/></button>',
            nextArrow: '<button type="button" class="slide__next"><i class="fa fa-arrow-right"/></button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });
    });
})();
