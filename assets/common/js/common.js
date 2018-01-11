/**
 各个页面共用的common模块
 **/


function openwindow(url, name, iWidth, iHeight) {
    // url 转向网页的地址
    // name 网页名称，可为空
    // iWidth 弹出窗口的宽度
    // iHeight 弹出窗口的高度
    //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
    var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
    var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
    window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
}

function openLayer(title, url, w, h) {
    if (title == null || title == '') {title = false;};
    if (url == null || url == '') {url = "../error/404.html";};
    if (w == null || w == '') {w = 800;};
    if (h == null || h == '') {h = ($(window).height() - 50);};
    layer.open({
        type: 2,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: true,
        shade: 0.4,
        skin: 'layui-layer-molv',
        title: title,
        content: url
    });
}

layui.define(['layer', 'util','element'], function (exports) {
    var layer = layui.layer,
        element = layui.element,
        util = layui.util;

    $('#login').on('click', function () {
        openLayer('用户登录', '../login/login_iframe.html', '440', '420');
    });

    $('#reg').on('click', function () {
        openLayer('用户注册', '../login/reg_iframe.html', '440', '460');
    });

    $('#admin').on('click', function () {
        openLayer('管理员登录', '../login/login_admin_iframe.html', '440', '420');
    });

    /*在线客服按钮点击事件*/
    $('#onlineChatBtn').on('click', function () {
        openwindow('http://p.qiao.baidu.com/cps/chat?siteId=11555035&userId=22742801', '', '585', '540')
    });

    /*固定右下角工具*/
    util.fixbar({
        bar1: true
        // , bar2: true
        , bar2: '&#xe63a;'
        , css: {right: 50, bottom: 100}
        , bgcolor: '#393D49'
        , click: function (type) {
            if (type === 'bar1') {
                openwindow('http://p.qiao.baidu.com/cps/chat?siteId=11555035&userId=22742801', '', '585', '540')
            } else if (type === 'bar2') {
                window.open('http://wpa.qq.com/msgrd?v=3&uin='+38873493+'&site=qq&menu=true')
            }/* else if (type === 'bar2') {
                window.open('../help/help_hall.html')
            }*/ else if (type === 'top') {
                $('html,body').animate({
                    'scrollTop': 0
                }, 500);
            }
        }
    });

    /*百度地图*/
    !function () {
        var points = [{
            id: 1,
            lng: 115.980489,
            lat: 28.716353,
            title: "国家电投江西能源销售有限公司",
            content: ["地址：江西省南昌市青山湖区艾溪湖北路66号 "]
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
                url: "../../assets/common/img/location_marker.png",
                width: 34,
                height: 94
            },
            centerPoint: { // 中心点经纬度
                lng: 115.980489,
                lat: 28.716353
            },
            index: 0, // 开启对应的信息窗口，默认-1不开启
            animate: true, // 是否开启坠落动画，默认false
            points: points // 标注点--id(唯一标识)
        });
        var data = map.getPosition();
    }();

    exports('common'); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
