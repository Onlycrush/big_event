// 每次发起ajax请求 都会调用ajaxPrefilter这个函数
// 在这个函数中我们可以获得Ajax提供的对象
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);
})