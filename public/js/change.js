(function($) {

    function checkSize(){
        
        if($(window).width() < 1010 ){
            $(".menuID").css('background-color', '#8CC13D');
            $(".rowBtnMessage").css('padding-left', '15px');
            $(".rowBtnMessage").css('padding-right', '15px');
            $(".searchComponent").css('position', 'relative');
            $(".searchComponent").css('top', '0%');
            $(".searchComponent").css('margin-top', '-50px');
            $(".searchComponentParent").css('height', 'initial');
            $("#searchContent").css('padding-left', '15px');
            $("#searchContent").css('padding-right', '15px');
            var wTemp = $("#mainSlider").width();
            var hTemp = (wTemp*3)/4 + 25;
            $("#mainSlider").height(hTemp);
        }else{
            $(".menuID").css('background-color', 'white');
            $(".rowBtnMessage").css('padding-left', '0px');
            $(".rowBtnMessage").css('padding-right', '0px');
            $(".searchComponent").css('margin-top', '0px');
            $(".searchComponent").css('top', '36%');
            $(".searchComponent").css('position', 'absolute');
            $(".searchComponentParent").css('height', 'inherit');
            $("#searchContent").css('padding-left', '0px');
            $("#searchContent").css('padding-right', '0px');
            $("#mainSlider").height(638);
        }
    }

    $(document).ready(function(){
        checkSize();
        $(window).resize(function() {
            checkSize();
        });
    });
})(jQuery); // End of use strict