
$(document).ready(function() {

    createfixedHeader();
    smoothScrolling();

    showMoreProject();

    setupNavSelectAndScrollSpy();

    $('.project-screenshot').slick({
        dots: true,

        // autoplay: true,
        // autoplaySpeed: 5000
    });

});

function createfixedHeader() {
    var $header = $('header'),
        headerHeight = $header.outerHeight(),
        $proxyHeader = $('.invisible-header-proxy');

    $proxyHeader.css("height", headerHeight);

    $header.css({
        "width": "100%",
        "position": "fixed"
    });


    // put border-bottom for header if we scroll down
    $(window).scroll(function () {
        if ($(window).scrollTop() > headerHeight) {
            $header.css("border-bottom", "2px solid #f1f1f1");
        } else {
            $header.css("border-bottom", "none");
        }
    })
}


//from: https://css-tricks.com/snippets/jquery/smooth-scrolling/

function smoothScrolling() {
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();

                    $('html, body').animate({
                        scrollTop: target.offset().top - $('header').outerHeight() - 50
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        /*$target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };*/
                    });
                }
            }
        });
}


function setupNavSelectAndScrollSpy() {

    /* Add "active" class on select */

    classActive = "active";

    $("nav a").click(function() {
        $(this).addClass(classActive);
        $(this).parent().siblings().find("a").removeClass(classActive);

        //TODO: There is a bug with when we click on "Contact", the scrollspy kicks in and activates "About" instead. Need to fix.
    });


    /*Initialise scrollspy */

    $('.scrollspy-section').scrollSpy();

    $('.scrollspy-section').on('scrollSpy:enter', function() {

        // get id of section div that has entered.
        var sectionId = $(this).attr('id');

        // add the "active" class to the corresponding nav a elements, and remove class from all others
        $("nav ." + sectionId).addClass(classActive);
        $("nav a:not(." + sectionId + ")").removeClass(classActive);
    });
}



function showMoreProject() {
    $(".read-more").on("click", function(e) {
        $(this).siblings(".more-project-container").slideToggle();

    });
}