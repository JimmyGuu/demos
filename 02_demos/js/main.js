// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import './plugins/jvectormap/jquery-jvectormap-1.2.2.css'
import './plugins/adminlte/css/skins/_all-skins.min.css'
import './plugins/adminlte/css/AdminLTE.min.css'
import './plugins/daterangepicker/daterangepicker.css'
import './plugins/pace/themes/black/pace-theme-minimal.css'
import 'font-awesome/css/font-awesome.min.css'
import './plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css'
import 'animate.css/animate.min.css'
import './plugins/iCheck/square/blue.css'

import 'bootstrap/dist/js/bootstrap.min.js'
import './plugins/sparkline/jquery.sparkline.min.js'
import './plugins/jvectormap/jquery-jvectormap-1.2.2.min.js'
import './plugins/jvectormap/jquery-jvectormap-world-mill-en.js'
import './plugins/slimScroll/jquery.slimscroll.min.js'
import './plugins/adminlte/js/app.min.js'
import './plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js'
import './plugins/bootstrap-datetimepicker/bootstrap-datepicker.zh-CN.js'
import './plugins/iCheck/icheck.min.js'
import 'babel-polyfill' // 注意放在router之前才有作用

// router js file
import router from './router'
// custom js file
// webpack global js file
import globalConfig from './js/global-config.js'
// common helper js
import DataHelper from './js/common_helper/data-helper.js'

$(document).ajaxStart(() => { Pace.restart() });


Vue.config.productionTip = false

