/*
 * @Description: “我的评价”界面
 * @Author: Celine
 * @Date: 2019-10-14 09:03:52
 * @LastEditTime: 2019-10-15 17:57:59
 * @LastEditors: Wanlin Chen
 */

import Vue from 'vue'
import App from './index'

// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

const app = new Vue(App)
app.$mount()