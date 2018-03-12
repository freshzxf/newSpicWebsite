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
        elem: '#monthPowerView'
        ,url: './assets/mockMonthPowerViewData.json' //数据接口（一般不是一个json文件，而是一个地址，后面会自动带上page和数据条目数：http://www.layui.com/demo/table/user/?page=1&limit=5）
        ,width: 945
        ,page: true //是否显示分页
        ,limit: 5
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
            // {field: 'numbers', title: '序号', type: 'numbers',width:60,fixed:'left'},
            {field: 'time', title: '月份',sort: true,fixed:'left',width:100}
            ,{field: 'monthContractPower', title: '本月合同计划（度）',sort: true,width:180}
            ,{field: 'yearContractPower', title: '年度合同计划（度）',sort: true,width:180}
            ,{field: 'kValue', title: 'K值',sort: true,width:80}
            ,{field: 'assessmentMethod', title: '偏差考核方式',sort: true,width:210}
            ,{field: 'actualPower', title: '月用电量（度）',sort: true,width:150}
            ,{field: 'largeIndustrial', title: '大工业用电量（度）',sort: true,width:180}
            ,{field: 'normalIndustrial', title: '一般工商业及其他用电量（度）',sort: true,width:260}
            ,{field: 'marketTradePower', title: '月市场化交易电量（度）',sort: true,width:215}
            ,{field: 'priceDiff', title: '价差',sort: true,width:100}
            ,{field: 'userPriceDiffReturn', title: '用户价差返还电价（元/度）',sort: true,width:235}
            ,{field: 'userPriceDiffMoney', title: '用户价差电费（元）',sort: true,width:180}
            ,{field: 'firmServiceMoney', title: '售电公司服务费（元）',sort: true,width:200}
            ,{field: 'segmentedPower', title: '分割的市场化累计电量（度）',sort: true,width:200}

            ,{field: 'remainPower', title: '剩余电量（度）',sort: true,width:180}
            // ,{field: 'action', title: '操作',width:150, align:'center', toolbar: '#toolBtns', fixed: 'right'}
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
    /*table.on('tool(monthPowerView)', function(obj){
        var data = obj.data;
        if(obj.event === 'preview'){
            openLayer('月度用电详情','power_view_detail_iframe.html','600','622')
            // layer.msg('ID：'+ data.id + ' 的预览操作');
        }
    });*/

    exports('monthPowerView', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
