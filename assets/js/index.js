$(function () {
    var layer = layui.layer;
    // 1.获取用户基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                // 渲染用户头像
                renderAvatar(res.data)
            },
            // // ajax有一个complete函数 无论请求失败或成功都会调用
            // complete: function (res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 1.强制清空token
            //         localStorage.removeItem('token')
            //         // 2.强制跳转到登录页
            //         location.href = '/12.1-大事件项目/login.html'
            //     }
            // }
        })
    }
    getUserInfo()
    // 渲染头像函数
    function renderAvatar(user) {
        // 用户名称
        let uname = user.nickname || user.username
        $('.welcome').html(`欢迎&nbsp;&nbsp;${uname}`)
        // 用户头像
        if (user.user_pic !== null) {
            // 渲染图片
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            uname
            // 渲染文字
            $('.layui-nav-img').hide()
            let first = uname[0].toUpperCase()
            $('.text-avatar').html(first).show()

        }
    }

    // 2.退出登录
    $('#logOut').click(function () {
        layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            // 确认退出
            // 1.删除当前用户的token
            localStorage.removeItem('token')
            // 2.跳转到登录页
            location.href = '/12.1-大事件项目/login.html'
            // 点击取消关闭询问框
            layer.close(index);
        });
    })
})