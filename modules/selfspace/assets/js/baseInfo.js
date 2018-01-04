/**
 baseInfo
 **/
layui.define(['layer', 'form','element','upload'], function(exports){
    var layer = layui.layer,
        element = layui.element,
        upload = layui.upload,
        form = layui.form;

    form.on('submit(myInfo)', function(data){
        if(data.field.pass !== data.field.repass){
            layer.msg('两次输入密码不一致')
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。        } //当前容器的全部表单字段，名值对形式：{name: value}
        }else{
            $('#formPwd')[0].reset();
            return false;
        }

    });

   /* upload.render({
        url: 'assets/mockUploadResponseData.json'
        ,elem: '#upload'  //指定原始元素，默认直接查找class="layui-upload-file"
        //,method: 'get' //上传接口的http类型,默认为post
        //,accept: 'file' //允许上传的文件类型，如果 accept 未设定，那么限制的就是图片的文件格式
        //,size: 50 //最大允许上传的文件大小
        ,done: function(res, index, upload){
            if(res.code == 200){
                $('#avatar').attr('src',res.data.src);
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
    });*/

    exports('baseInfo', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
