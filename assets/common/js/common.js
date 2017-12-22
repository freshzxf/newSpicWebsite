var commonModules = function () {

    // 定义渲染百度地图函数
    var handleBaiduMap = function () {
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
    };
    return {
        init: function () {
            handleBaiduMap();
        },
        /*scrollTop: function () {
            App.scrollTo();
        }*/
    };
}();


function openwindow(url,name,iWidth,iHeight){
    // url 转向网页的地址
    // name 网页名称，可为空
    // iWidth 弹出窗口的宽度
    // iHeight 弹出窗口的高度
    //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
    var iTop = (window.screen.height-30-iHeight)/2; //获得窗口的垂直位置;
    var iLeft = (window.screen.width-10-iWidth)/2; //获得窗口的水平位置;
    window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
}