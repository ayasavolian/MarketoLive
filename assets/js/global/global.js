$(document).ready(function() {
    var x = 0;
    $("#help-link, #sidebar-help").click(function() {
        $('.help-center-box').animate({
            'margin-top': '125px',
        }, 400, function() {});
        $('.help-cover').css('display', 'block');
        $('.help-center-container').css('display', 'block');
    });

    $("#second-option").click(function() {
        $("#audience-menu").css("display", "block");
    });

    $('.cancel-help').click(function() {
        $('.help-cover').css('display', 'none');
        $('.help-center-container').css('display', 'none');
    });

    $('.marketo-ball').click(function() {
        if (x == 0) {
            x = 1;
            $('.side-bar').css({
                'background-color': '#fff',
                'z-index': '999'
            });
            $('.side-bar-inner-container').fadeIn("slow");
        } else {
            x = 0;
            $('.side-bar').css({
                'background-color': 'transparent',
                'z-index': '-999'
            });
            $('.side-bar-inner-container').css('display', 'none');
        }
    });
});