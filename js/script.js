// Depends on width, choose the mobile or standard menu
(function($, window, document, undefined) {
    'use strict';

    $(function() {
        $("#mobileMenu").hide();
        $(".toggleMobile").click(function() {
            $(this).toggleClass("active");
            $("#mobileMenu").slideToggle(500);
        });
    });
    $(window).on("resize", function() {
        // Standard menu if width greater than 500 px
        if ($(this).width() > 500) {
            $("#mobileMenu").hide();
            $(".toggleMobile").removeClass("active");
        }
    });
})(jQuery, window, document);