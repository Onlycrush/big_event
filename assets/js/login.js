$(function () {

    // 登录注册页面切换
    $('#link_login').click(function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    $('#link_reg').click(function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 从layui中获取form对象
    const form = layui.form
    const layer = layui.layer
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        // 形参value是当前表单的内容
        // 判断value是否等于上次的内容
        repwd: function (value) {
            if ($('.reg-box [name=password]').val() !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 发起注册请求
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        // console.log(username, password);
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录');
            $('#link_login').click()
        }
        )
    })
    // 发起登录请求
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                // 登陆成功后把身份验证字符串存入本地存储
                localStorage.setItem('token', res.token)
                console.log(res.token);
                // 成功则跳转到首页
                location.href = '/12.1-大事件项目/index.html'
            }
        })
    })

})