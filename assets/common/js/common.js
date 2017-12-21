var Modules = function () {

    // IE mode
    var isRTL = false;
    var isIE8 = false;
    var isIE9 = false;
    var isIE10 = false;
    var isIE11 = false;

    var responsive = true;

    var responsiveHandlers = [];

    var handleInit = function() {

        if ($('body').css('direction') === 'rtl') {
            isRTL = true;
        }

        isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
        isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
        isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);
        isIE11 = !! navigator.userAgent.match(/MSIE 11.0/);

        if (isIE10) {
            jQuery('pages').addClass('ie10'); // detect IE10 version
        }
        if (isIE11) {
            jQuery('pages').addClass('ie11'); // detect IE11 version
        }
    }

    // runs callback functions set by App.addResponsiveHandler().
    var runResponsiveHandlers = function () {
        // reinitialize other subscribed elements
        for (var i in responsiveHandlers) {
            var each = responsiveHandlers[i];
            each.call();
        }
    }

    // handle the layout reinitialization on window resize
    var handleResponsiveOnResize = function () {
        var resize;
        if (isIE8) {
            var currheight;
            $(window).resize(function () {
                if (currheight == document.documentElement.clientHeight) {
                    return; //quite event since only body resized not window.
                }
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function () {
                    runResponsiveHandlers();
                }, 50); // wait 50ms until window resize finishes.
                currheight = document.documentElement.clientHeight; // store last body client height
            });
        } else {
            $(window).resize(function () {
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function () {
                    runResponsiveHandlers();
                }, 50); // wait 50ms until window resize finishes.
            });
        }
    }

    var handleIEFixes = function() {
        //fix html5 placeholder attribute for ie7 & ie8
        if (isIE8 || isIE9) { // ie8 & ie9
            // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
            jQuery('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {

                var input = jQuery(this);

                if (input.val() == '' && input.attr("placeholder") != '') {
                    input.addClass("placeholder").val(input.attr('placeholder'));
                }

                input.focus(function () {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });

                input.blur(function () {
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });
        }
    }

    // Handles scrollable contents using jQuery SlimScroll plugin.
    var handleScrollers = function () {
        $('.scroller').each(function () {
            var height;
            if ($(this).attr("data-height")) {
                height = $(this).attr("data-height");
            } else {
                height = $(this).css('height');
            }
            $(this).slimScroll({
                allowPageScroll: true, // allow page scroll when the element scroll is ended
                size: '7px',
                color: ($(this).attr("data-handle-color")  ? $(this).attr("data-handle-color") : '#bbb'),
                railColor: ($(this).attr("data-rail-color")  ? $(this).attr("data-rail-color") : '#eaeaea'),
                position: isRTL ? 'left' : 'right',
                height: height,
                alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
                disableFadeOut: true
            });
        });
    }

    var handleMenu = function() {
        $(".header .navbar-toggle").click(function () {
            if ($(".header .navbar-collapse").hasClass("open")) {
                $(".header .navbar-collapse").slideDown(300)
                    .removeClass("open");
            } else {
                $(".header .navbar-collapse").slideDown(300)
                    .addClass("open");
            }
        });
    }

    var handleSubMenuExt = function() {
        $(".header-navigation .dropdown").on("hover", function() {
            if ($(this).children(".header-navigation-content-ext").show()) {
                if ($(".header-navigation-content-ext").height()>=$(".header-navigation-description").height()) {
                    $(".header-navigation-description").css("height", $(".header-navigation-content-ext").height()+22);
                }
            }
        });
    }

    var handleFancybox = function () {
        if (!jQuery.fancybox) {
            return;
        }
        jQuery(".fancybox-fast-view").fancybox();
        if (jQuery(".fancybox-button").size() > 0) {
            jQuery(".fancybox-button").fancybox({
                groupAttr: 'data-rel',
                prevEffect: 'none',
                nextEffect: 'none',
                closeBtn: true,
                helpers: {
                    title: {
                        type: 'inside'
                    }
                }
            });
            $('.fancybox-video').fancybox({
                type: 'iframe'
            });
        }
    }

    // Handles Bootstrap Tabs.
    var handleTabs = function () {
        // fix content height on tab click
        $('body').on('shown.bs.tab', '.nav.nav-tabs', function () {
            handleSidebarAndContentHeight();
        });

        //activate tab if tab id provided in the URL
        if (location.hash) {
            var tabid = location.hash.substr(1);
            $('a[href="#' + tabid + '"]').click();
        }
    }

    // Handles baiduMap
    var handleBaiduMap = function () {
        var points = [{
            id: 1,
            lng: 115.9872540101,
            lat: 28.7213847718,
            title: "江西百电",
            content: ["地址：江西省南昌市国家级大学生双创基地"]
        }, {
            id: 2,
            lng: 118.095231,
            lat: 24.461615,
            title: "厦门实验小学",
            content: ["地址：北京市后花园风景区", "电话：010-69768087"]
        }, {
            id: 3,
            lng: 118.092644,
            lat: 24.468522,
            title: "厦门光明大厦",
            content: ["地址：北京市东城区景山前街4号", "电话：010-65131892"]
        }, {
            id: 4,
            lng: 118.106586,
            lat: 24.467207,
            title: "厦门将军祠",
            content: ["地址：北京市东城区天坛东里甲1号", "电话：010-67013036"]
        }, {
            id: 5,
            lng: 118.108526,
            lat: 24.474245,
            title: "厦门古龙商城",
            content: ["地址：北京市西城区文津街1号(故宫北)", "电话：010-64040610"]
        }];
        var map = new BaiduMap({
            id: "mapContainer",
            level: 16, //  选填--地图级别--(默认15)
            zoom: true, // 选填--是否启用鼠标滚轮缩放功能--(默认false)
            type: ["地图", "卫星", "三维"], // 选填--显示地图类型--(默认不显示)

            titleClass: "map_tit",
            contentClass: "map_con",
            showPanorama: true, // 是否显示全景控件(默认false)
            showMarkPanorama: true, // 是否显示标注点全景图(默认false)
            showLabel: false, // 是否显示文本标注(默认false)
            mapStyle: "normal", // 默认normal,可选dark,light
            icon: { // 选填--自定义icon图标
                url: "../assets/global/img/marker2.png",
                width: 34,
                height: 94
            },
            centerPoint: { // 中心点经纬度
                lng: 115.9872540101,
                lat: 28.7213847718
            },
            index: 0, // 开启对应的信息窗口，默认-1不开启
            animate: true, // 是否开启坠落动画，默认false
            points: points, // 标注点--id(唯一标识)
        });
        var data = map.getPosition();
        $('.open-panorama-btn').attr('src','../assets/global/img/panorama.png')
    }

    return {
        init: function () {
            // init core variables
            handleInit();
            handleResponsiveOnResize();
            handleIEFixes();
            handleFancybox();
            handleDifInits();
            handleSidebarMenu();
            handleAccordions();
            handleMenu();
            handleScrollers();
            handleSubMenuExt();
            handleMobiToggler();
            handleBaiduMap();
        },

        initUniform: function (els) {
            if (els) {
                jQuery(els).each(function () {
                    if ($(this).parents(".checker").size() == 0) {
                        $(this).show();
                        $(this).uniform();
                    }
                });
            } else {
                handleUniform();
            }
        },

        initTouchspin: function () {
            $(".product-quantity .form-control").TouchSpin({
                buttondown_class: "btn quantity-down",
                buttonup_class: "btn quantity-up"
            });
            $(".quantity-down").html("<i class='fa fa-angle-down'></i>");
            $(".quantity-up").html("<i class='fa fa-angle-up'></i>");
        },

        initFixHeaderWithPreHeader: function () {
            jQuery(window).scroll(function() {
                if (jQuery(window).scrollTop()>37){
                    jQuery("body").addClass("page-header-fixed");
                }
                else {
                    jQuery("body").removeClass("page-header-fixed");
                }
            });
        },

        initOWL: function () {
            $(".owl-carousel6-brands").owlCarousel({
                pagination: false,
                navigation: true,
                items: 6,
                addClassActive: true,
                itemsCustom : [
                    [0, 1],
                    [320, 1],
                    [480, 2],
                    [700, 3],
                    [975, 5],
                    [1200, 6],
                    [1400, 6],
                    [1600, 6]
                ],
            });

            $(".owl-carousel5").owlCarousel({
                pagination: false,
                navigation: true,
                items: 5,
                addClassActive: true,
                itemsCustom : [
                    [0, 1],
                    [320, 1],
                    [480, 2],
                    [660, 2],
                    [700, 3],
                    [768, 3],
                    [992, 4],
                    [1024, 4],
                    [1200, 5],
                    [1400, 5],
                    [1600, 5]
                ],
            });

            $(".owl-carousel4").owlCarousel({
                pagination: false,
                navigation: true,
                items: 4,
                addClassActive: true,
            });

            $(".owl-carousel3").owlCarousel({
                pagination: false,
                navigation: true,
                items: 3,
                addClassActive: true,
                itemsCustom : [
                    [0, 1],
                    [320, 1],
                    [480, 2],
                    [700, 3],
                    [768, 2],
                    [1024, 3],
                    [1200, 3],
                    [1400, 3],
                    [1600, 3]
                ],
            });

            $(".owl-carousel2").owlCarousel({
                pagination: false,
                navigation: true,
                items: 2,
                addClassActive: true,
                itemsCustom : [
                    [0, 1],
                    [320, 1],
                    [480, 2],
                    [700, 3],
                    [975, 2],
                    [1200, 2],
                    [1400, 2],
                    [1600, 2]
                ],
            });
        },

        initPortletTools: function() {
            // handle portlet remove
            $('body').on('click', '.portlet > .portlet-title > .tools > a.remove', function(e) {
                e.preventDefault();
                var portlet = $(this).closest(".portlet");

                if ($('body').hasClass('page-portlet-fullscreen')) {
                    $('body').removeClass('page-portlet-fullscreen');
                }

                portlet.find('.portlet-title .fullscreen').tooltip('destroy');
                portlet.find('.portlet-title > .tools > .reload').tooltip('destroy');
                portlet.find('.portlet-title > .tools > .remove').tooltip('destroy');
                portlet.find('.portlet-title > .tools > .config').tooltip('destroy');
                portlet.find('.portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand').tooltip('destroy');

                portlet.remove();
            });

            // handle portlet fullscreen
            $('body').on('click', '.portlet > .portlet-title .fullscreen', function(e) {
                e.preventDefault();
                var portlet = $(this).closest(".portlet");
                if (portlet.hasClass('portlet-fullscreen')) {
                    $(this).removeClass('on');
                    portlet.removeClass('portlet-fullscreen');
                    $('body').removeClass('page-portlet-fullscreen');
                    portlet.children('.portlet-body').css('height', 'auto');
                } else {
                    var height = Layout.getViewPort().height -
                        portlet.children('.portlet-title').outerHeight() -
                        parseInt(portlet.children('.portlet-body').css('padding-top')) -
                        parseInt(portlet.children('.portlet-body').css('padding-bottom'));

                    $(this).addClass('on');
                    portlet.addClass('portlet-fullscreen');
                    $('body').addClass('page-portlet-fullscreen');
                    portlet.children('.portlet-body').css('height', height);
                }
            });

            $('body').on('click', '.portlet > .portlet-title > .tools > a.reload', function(e) {
                e.preventDefault();
                var el = $(this).closest(".portlet").children(".portlet-body");
                var url = $(this).attr("data-url");
                var error = $(this).attr("data-error-display");
                if (url) {
                    App.blockUI({
                        target: el,
                        animate: true,
                        overlayColor: 'none'
                    });
                    $.ajax({
                        type: "GET",
                        cache: false,
                        url: url,
                        dataType: "html",
                        success: function(res) {
                            App.unblockUI(el);
                            el.html(res);
                            App.initAjax() // reinitialize elements & plugins for newly loaded content
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            App.unblockUI(el);
                            var msg = 'Error on reloading the content. Please check your connection and try again.';
                            if (error == "toastr" && toastr) {
                                toastr.error(msg);
                            } else if (error == "notific8" && $.notific8) {
                                $.notific8('zindex', 11500);
                                $.notific8(msg, {
                                    theme: 'ruby',
                                    life: 3000
                                });
                            } else {
                                alert(msg);
                            }
                        }
                    });
                } else {
                    // for demo purpose
                    App.blockUI({
                        target: el,
                        animate: true,
                        overlayColor: 'none'
                    });
                    window.setTimeout(function() {
                        App.unblockUI(el);
                    }, 1000);
                }
            });

            // load ajax data on page init
            $('.portlet .portlet-title a.reload[data-load="true"]').click();

            $('body').on('click', '.portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand', function(e) {
                e.preventDefault();
                var el = $(this).closest(".portlet").children(".portlet-body");
                if ($(this).hasClass("collapse")) {
                    $(this).removeClass("collapse").addClass("expand");
                    el.slideUp(200);
                } else {
                    $(this).removeClass("expand").addClass("collapse");
                    el.slideDown(200);
                }
            });
        },

        initImageZoom: function () {
            $('.product-main-image').zoom({url: $('.product-main-image img').attr('data-BigImgSrc')});
        },

        initSliderRange: function () {
            $( "#slider-range" ).slider({
                range: true,
                min: 0,
                max: 500,
                values: [ 50, 250 ],
                slide: function( event, ui ) {
                    $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                }
            });
            $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
                " - $" + $( "#slider-range" ).slider( "values", 1 ) );
        },

        // wrapper function to scroll(focus) to an element
        scrollTo: function (el, offeset) {
            var pos = (el && el.size() > 0) ? el.offset().top : 0;
            if (el) {
                if ($('body').hasClass('page-header-fixed')) {
                    pos = pos - $('.header').height();
                }
                pos = pos + (offeset ? offeset : -1 * el.height());
            }

            jQuery('pages,body').animate({
                scrollTop: pos
            }, 'slow');
        },

        scrollTop: function () {
            App.scrollTo();
        },

        // To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
        getViewPort: function() {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        },

    };
}();