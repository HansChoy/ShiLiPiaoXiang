/*
 * @Author: Wanlin Chen 
 * @Date: 2019-10-11 11:05:52 
 * @Last Modified by:   Wanlin Chen 
 * @Last Modified time: 2019-10-11 11:05:52 
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