/**
 news入口
 **/
layui.define(['layer', 'element', 'form', 'layedit', 'table'], function (exports) {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , table = layui.table;


    //计量装置
    table.render({
        elem: '#historyConsult'
        , url: './assets/mockMeteringDeviceData.json' //数据接口
        , width: 948
        /*定义发送请求的参数*/
        /*,request: {
            pageName: 'page' //页码的参数名称，默认：page
            ,limitName: 'limit' //每页数据量的参数名，默认：limit
        }*/
        /*定义接收服务器返回数据的格式要求*/
        , response: {
            statusName: 'code' //数据状态的字段名称，默认：code
            , statusCode: 200 //成功的状态码，默认：0
            , msgName: 'msg' //状态信息的字段名称，默认：msg
            , countName: 'count' //数据总数的字段名称，默认：count
            , dataName: 'data' //数据列表的字段名称，默认：data
        }
        , cols: [[ //表头
            {field: 'numbers', title: '序号', type: 'numbers',width:110,fixed:'left'}
            , {field: 'timeInt', title: '时段'}
            , {field: 'lastTable', title: '上月表底', sort: true}
            , {field: 'nowTable', title: '本月表底', sort: true}
            , {field: 'rate', title: '倍率', sort: true}
            , {field: 'amount', title: '电量', sort: true}
            ,{field: 'action', title: '操作',width:150, align:'center', toolbar: '#toolBtnsHistory', fixed: 'right'}

        ]]
        , done: function (res, curr, count) {
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
    table.on('tool(historyConsult)', function(obj){
        var data = obj.data;
        if(obj.event === 'preview'){
            openLayer('业务咨询单详情','business_consulting_detail_iframe.html','600','550')
            // layer.msg('预览操作purchaseSaleTable');
        }else if(obj.event === 'download'){
            layer.alert('下载文件：<br>'+ JSON.stringify(data))
        }
    });
    //自定义验证规则
    form.verify({
        title: function (value) {
            if (value.length < 5) {
                return '标题至少得5个字符';
            }
        }
        , pass: [/(.+){6,12}$/, '密码必须6到12位']
        , content: function (value) {
            layedit.sync(editIndex);
        }
    });

    //监听提交
    form.on('submit(demo1)', function (data) {
        layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        })
        return false;
    });

    exports('businessConsulting', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
