// 每次发起ajax请求 都会调用ajaxPrefilter这个函数
// 在这个函数中我们可以获得Ajax提供的对象
$.ajaxPrefilter(function (options) {
    // 1.自动拼接url
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //2. 统一为需要权限的接口(开有为my的接口)设置headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 3.挂载complete回调函数
    // ajax有一个complete函数 无论请求失败或成功都会调用
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2.强制跳转到登录页
            location.href = '/login.html'
        }
    }
})