/**
 页面模块入口
 **/
layui.define(['layer', 'element', 'form', 'layedit', 'laydate', 'table','upload'], function (exports) {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , upload = layui.upload
        , table = layui.table;


    upload.render({
        url: 'assets/mockUploadResponseData.json'
        ,elem: '#upload'  //指定原始元素，默认直接查找class="layui-upload-file"
        //,method: 'get' //上传接口的http类型,默认为post
        //,accept: 'file' //允许上传的文件类型，如果 accept 未设定，那么限制的就是图片的文件格式
        //,size: 50 //最大允许上传的文件大小
        ,done: function(res, index, upload){
            if(res.code == 200){
                $('#upload').val(res.data.src);
                layer.msg(res.data.src+'上传成功');
            }
            console.log(res);
        }
        ,error: function(res){
            console.log(res);
        }
        ,success: function(res){
            console.log(res);
        }
    });

    //历史结算上报单
    table.render({
        elem: '#historySettlementReport'
        ,url: './assets/mockContractPurchaseSaleData.json' //数据接口
        ,width: 948
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
            ,{field: 'sellFrim', title: '售电公司名称'}
            ,{field: 'signDate', title: '签订日期',sort: true}
            ,{field: 'startDate', title: '开始日期',sort: true}
            ,{field: 'endDate', title: '结束日期', sort: true}
            ,{field: 'contractTotal', title: '合同总电量（wkwh）', sort: true}
            ,{field: 'action', title: '操作',width:150, align:'center', toolbar: '#toolBtnsHistory', fixed: 'right'}
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
        ,page: true //是否显示分页
    });
    //监听工具条
    table.on('tool(historySettlementReport)', function(obj) {
        var data = obj.data;
        if (obj.event === 'preview') {
            openLayer('购售电合同详情', 'contract_detail_iframe.html', '986', '622')
            // layer.msg('预览操作purchaseSaleTable');
        } else if (obj.event === 'download') {
            layer.alert('下载文件：<br>' + JSON.stringify(data))
        }
    });
    //日期
    laydate.render({
        elem: '#date',
        type: 'month',
        value: new Date(),
        max: 7
    });

    //监听提交
    form.on('submit(settlement)', function (data) {
        layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        })
        return false;
    });

    exports('settlementReport', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
