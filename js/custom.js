(function ($) {
    var body = $('body');
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
        body.addClass('ie');
    } else {
        body.addClass('no-ie');

    }

    $(window).on("load", function () {

        if ($(window).width() > 600) {
            $(".scrollon").mCustomScrollbar({
                axis: "y",
                scrollButtons: {
                    enable: true
                },
                theme: "minimal-dark",
                //scrollbarPosition: "outside",
                setHeight: 740,
                alwaysShowScrollbar: 2,
                //	theme:"minimal-dark"
                //	scrollInertia: 300,
            });


            $("#accordion .panel-body").mCustomScrollbar({
                setHeight: 300,
                theme: "dark-3"
            });

            $("#myTab .tab-pane").mCustomScrollbar({
                setHeight: 280,
                theme: "inset-2-dark"
            });


            $(".scrollTo a").click(function () {
                if ($(this).attr('href') == "#top") {
                    var elID = ".entry-title";
                    $(".scrollon").mCustomScrollbar("scrollTo", elID);
                } else {
                    if ($(this).attr('href').indexOf("#") >= 0) {
                        $(".scrollon").mCustomScrollbar("scrollTo", $(this).attr('href'));
                    }
                }
            });

        } //end window size

        $('.delete, .modal-background, .modal-card-foot button.button').click(function () {
            $('.modal').removeClass('is-active');
        });

        $('.loading-spinner').css('display', 'none');

    }); //window on load

    function makeThumb(data) {
        //console.log('섬네일생성');
        $(data).each(function (index, value) {
            var catName = '';
            if (value.category == 'cat1') {
                catName = '<i class="fab fa-wordpress-simple"></i> <i class="far fa-file-code"></i> 제작 ';
            } else if (value.category == 'cat2') {
                catName = '<i class="fab fa-wordpress-simple"></i> 유지보수 ';
            } else if (value.category == 'cat3') {
                catName = '<i class="far fa-file-code"></i> 디자인/퍼블/기타';
            } else if (value.category == 'cat1 cat2') {
                catName = '<i class="fab fa-wordpress-simple"></i> <i class="far fa-file-code"></i> 제작/유지보수';
            } else if (value.category == 'cat1 cat3') {
                catName = '<i class="fab fa-wordpress-simple"></i> <i class="far fa-file-code"></i> 디자인/퍼블/제작';
            }
            var html = '<div class="mix ' + value.category + '" id="ctl-' + value.id + '">';
            html += '<div class="thumb-container" style="background-image:url(' + value.img1 + ')"></div>';
            html += '<div class="portfolio-description">';
            html += '<p class="ti-subject">' + value.title + '</p>';
            html += '<p class="ti-period">' + value.period + '</p>';
            html += '<p class="ti-desc">' + catName + '</p>';
            html += '</div>';
            html += '</div>';
            $('#port-folio').append(html);
        });
    }

    function makePop() {
        $('.mix').each(function (n) {
            var kid = $(this).attr('id').replace('ctl-', '');

            $(this).on('click', function (e) {
                $.ajax({
                    url: 'data.json',
                    dataType: 'json',
                    type: 'get',
                    cache: false,
                    success: function (data) {
                        $('.aja').remove();
                        $(data).each(function (n, val) {
                            if (val.id == kid) {
                                $('.modal-card-title').text(val.title);

                                var html = '<div class="aja">';
                                html += '<p class="tech"><strong>기술:</strong><br>' + val.teck + '</p>';
                                html += '<p class="tech"><strong>담당:</strong><br>' + val.charge + '</p>';
                                html += '<p class="desc"><strong>내용:</strong><br>' + val.description + '</p>';
                                html += (val.url.length != 0) ? '<p class="url"><strong>링크:</strong><br><a href="' + val.url + '" target="_blank">' + val.url + '</a></p>' : '<p><strong>서비스 종료(중지)</strong></p>';
                                html += (val.img2.length != 0) ? '<p><img src="' + val.img2 + '"></p>' : '';
                                html += (val.img3.length != 0) ? '<p><img src="' + val.img3 + '"></p>' : '';
                                html += '';
                                html += '</div>';

                                $('.modal-card-body').append(html).animate({
                                    scrollTop: 0
                                }, 100);
                                $('.modal').addClass('is-active');

                            }

                        });

                    }
                });

            });
        });
    }


    function mixin() {
        var containerEl = document.querySelector('.portfolio');
        var mixer = mixitup(containerEl, {
            animation: {
                effects: 'fade',
                animateResizeContainer: false
            }
        });
    }

    function noRef() {
        $('.modal').on('click', 'a', function (e) {
            href = e.target.getAttribute('href')
            if (href && href.hostname != window.location.hostname) {
                e.preventDefault();
                var dotw = window.open("", "dot_window");
                dotw.document.open();
                dotw.document.writeln('<script type="text/javascript">window.location = "' + this.href + '";</script>');
                dotw.document.close();
            }
        });
    }

    $.ajax({
        url: 'data.json',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {
            makeThumb(data);
            makePop();
            mixin();
            noRef();
        }
    });

    function alertTime() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        hours = (hours > 12) ? hours - 12 : hours;
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        $('#currenttime').text(hours + ':' + minutes + ':' + seconds);
    }

    setInterval(alertTime, 1000);

})(jQuery);
