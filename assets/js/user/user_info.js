$(function () {
    var form = layui.form;
    // 1.验证昵称
    form.verify({
        nickname: function (value) {
            if (value.length < 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()
    // 2.获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }

                // 获取值赋值给页面表单
                console.log(res);
                form.val('formUserInfo', res.data)
                // console.log($('[name=id]').val());
            }
        })
    }
    // 3.重置用户表单
    $('#btnReset').click(function (e) {
        e.preventDefault()
        initUserInfo()
    })
    // 4.提交表单更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息更新失败!')
                }
                layer.msg('用户信息更新成功')
                window.parent.getUserInfo()
            }
        })
    })

})