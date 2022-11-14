$(function () {
    var form = layui.form;
    // 1.验证密码
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        // 形参value是当前表单的内容
        // 判断value是否等于上次的内容
        samepwd: function (value) {
            if ($('[name=oldPwd]').val() === value) {
                return '新旧密码不能相同'
            }
        },
        repwd: function (value) {
            if ($('[name=newPwd]').val() !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 3.重置用户表单
    // $('#btnReset').click(function (e) {
    //     e.preventDefault()
    // })
    // 4.提交表单更新用户密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户密码更新失败!')
                }
                layer.msg('用户密码更新成功')
                console.log(res);
                $('.layui-form')[0].reset()
            }
        })
    })

})