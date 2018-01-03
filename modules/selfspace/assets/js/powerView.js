/**
 news入口
 **/
layui.define(['layer','table','layedit', 'laydate'], function(exports){
        var  layer = layui.layer
            ,layedit = layui.layedit
            ,table = layui.table
            ,laydate = layui.laydate;

    laydate.render({
        elem: '#date' //指定元素
        ,type:'month'
        ,max: 7 //7天后
        ,theme: 'grid'
        //,showBottom: false
        // ,change: function(value, date){
        //     $('#date').val(value);
        //     console.log('你选择的日期是：' + value + '<br><br>获得的对象是' + JSON.stringify(date));
        // }
    });


    //第一个实例
    table.render({
        elem: '#powerView'
        ,url: './assets/mockPowerViewData.json' //数据接口
        ,page: true //是否显示分页
        /*定义发送请求的参数*/
        /*,request: {
            pageName: 'page' //页码的参数名称，默认：page
            ,limitName: 'limit' //每页数据量的参数名，默认：limit
        }*/
        /*定义接收服务器返回数据的格式要求*/
        ,response: {
            statusName: 'code' //数据状态的字段名称，默认：code
            ,statusCode: 200 //成功的状态码，默认：0
            ,msgName: 'msg' //状态信息的字段名称，默认：msg
            ,countName: 'count' //数据总数的字段名称，默认：count
            ,dataName: 'data' //数据列表的字段名称，默认：data
        }
        ,cols: [[ //表头
            {field: 'numbers', title: '序号', type: 'numbers',width:110,fixed:'left'}
            ,{field: 'time', title: '时间',sort: true}
            ,{field: 'amount', title: '总用电量',sort: true}
            ,{field: 'action', title: '操作',width:150, align:'center', toolbar: '#toolBtns', fixed: 'right'}
        ]]
        , done: function(res, curr, count){
            //如果是异步请求数据方式，res即为你接口返回的信息。
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            console.log(res);
            //得到当前页码
            console.log(curr);
            //得到数据总量
            console.log(count);
        }
    });

    //监听工具条
    table.on('tool(powerView)', function(obj){
        var data = obj.data;
        if(obj.event === 'preview'){
            openLayer('月度用电详情','power_view_detail_iframe.html','600','622')
            // layer.msg('ID：'+ data.id + ' 的预览操作');
        }
    });

    exports('powerView', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
