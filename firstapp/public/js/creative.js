/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    $(document).ready(function(){
        
        $('#btntheongay').click(function(){
            $('#btntheongay').addClass('active');
            $('#theongay').removeClass('hide');
            $('#btndaihan').removeClass('active');
            $('#daihan').addClass('hide');
        });
        $('#btndaihan').click(function(){
            $('#btndaihan').addClass('active');
            $('#daihan').removeClass('hide');
            $('#btntheongay').removeClass('active');
            $('#theongay').addClass('hide');
        });
        
        $('#mypanel > .panel').on('show.bs.collapse', function (e) {
            $(this).find('.panel-heading').addClass("active-panel");
        });
        $('#mypanel > .panel').on('hide.bs.collapse', function (e) {
            $(this).find('.panel-heading').removeClass("active-panel");
        });

        
        
        
        var limitday = new Date();
        limitday.setDate(limitday.getDate() + 30);
        $('.dpindex').datepicker({
            language: 'vi',
            startDate: new Date(),
            endDate: limitday
        });
    });
    "use strict"; // Start of use strict
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });
    $("#mainSlider").vegas({
            delay: 10000,
	    timer: false,
        cover:true,
            transitionDuration: 5500,
            slides: [
                { src: "/img/slide1.jpg" },
                //{ src: "/img/slide2.jpg" },
                { src: "/img/slide3.jpg" },
                { src: "/img/slide4.jpg" }
            ]
        });
    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '25px',
            maxFontSize: '55px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict
