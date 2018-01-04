// 模块加载的配置
require.config({
    // 基目录 如果每个模块不在一个基目录
    // 不使用baseUrl直接在paths中具体指定
    baseUrl: "lib",
    paths: {
        'jquery': 'jquery',
        'vue': 'vue.min',
        'pagination': 'my-pager'
    },

    // shim属性 专门用来配置不兼容的模块 每个模块要定义:
    // (1) exports值（输出的变量名）表明这个模块外部调用时的名称
    // (2) deps数组 表明该模块的依赖性
    // 比如jq的插件可以这样定义
    shim: {
        'jquery.scroll': {
            deps: ['jquery'],
            exports: 'jQuery.fn.scroll'
        }
    }

    // requireJS还有一系列插件 不再赘述
    // [Plugins](https://github.com/requirejs/requirejs/wiki/Plugins)
});

// 主模块依赖于其它模块，这时就需要使用AMD规范定义的require()函数
// require([modules], function (modules) { });
require(['jquery', 'vue', 'pagination'], function ($, Vue, pagination) {
    console.log($);
    console.log(Vue);
    console.log(pagination);
});