/* eslint-disable */
/**
 * [serializeParams 序列化object为http get 参数]
 * @param  {[object]} obj [params object]
 * @return {[string]}     [string]
 */
export function serializeParams(obj) {
  let str = ''
  for (let [key, value] of Object.entries(obj)) {
    str += '&' + key + '=' + value
  }
  return str
}

/**
 * [formatNumber 格式化数字，金额等一些列值]
 * @param  {[number|string]} nm [需要被格式化的数值]
 * @return {[string]}    [带千分位和两位有小数字的值]
 */
export function formatNumber(nm) {
  let _value = (+nm).toFixed(2),
    sign = ''
  sign = _value < 0 && parseInt(_value) == 0 ? '-' : ''
  _value = sign + (parseInt(_value).toLocaleString() + '.' + _value.split('.')[1]).replace(/,/g, ' , ')
  return _value
}

/**
 * [formatDate 格式化unix时间戳]
 * @param  {[number]} nm       [时间戳(毫秒)]
 * @param  {[string]} dSpliter [日期分割符]
 * @param  {[string]} tSpliter [时间分割符]
 * @return {[string]}          [格式化好的时间]
 */

const fixNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function formatDate(nm, dSpliter) {
  let dStr = ''
  if (!nm) {
    return '-'
  }
  let date = new Date(nm),
    y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    min = date.getMinutes(),
    s = date.getSeconds()

  dSpliter = dSpliter || ''
  dStr = [y, fixNumber(m), fixNumber(d)].join(dSpliter) + ' ' + [fixNumber(h), fixNumber(min), fixNumber(s)].join(':')
  return dStr
}

import axios from 'axios'

/**
 * [setAxiosPostContentType axios劫持]
 */

export function setAxiosPostContentType() {
  axios.interceptors.request.use((config) => {
    // 设置使用post时的content-type axios core/dispatchRequest 下的bug(config.headers的merge策略有问题)导致不能提前设置post的content-type
    if (config.method == "post") {
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config;
  }, (error) => {
    console.log(error)
  })
}

/**
 * [handleHttpErrorNo 处理所有axios请求返回errorno != 0的情况]
 * @return {[type]} [description]
 */

import Vue from 'vue'
import router from '@/router'

export function handleHttpErrorNo() {
  axios.interceptors.response.use((res) => {
    if (res && res.data.errno !== 0) {
      /**
       * 当前vue实例的this指针，需要use element ui
       */
      /** 没有权限 **/
      if (res.data.errno == 403000) {
        router.push({
          name: 'noauth',
          query: {
            r: res.data.result.url
          }
        })
        return
      }
      this.$message.error(res.data.errmsg)
      /** 没有登录 **/
      if (res.data.errno == 302000) {
        window.location.href = res.data.result.url
      }

    } else {
      return res
    }
  }, (error) => {
    console.log(error)
  })
}

import {
  SIDERMENU
} from '@/common/common'
/**
 * [getCrumbInfo 获取当前hash对应的crumb]
 * @param  {[string]} hash [description]
 * @return {[array]}      [description]
 */

function getCrumbPath(path, config, info) {
  let currentPath = path[0]

  for (let i = 0; i < config.length; i++) {
    if (config[i].path == currentPath) {
      info.push(config[i].title)
      path.shift()
      if (path.length != 0 && config[i].children && config[i].children.length != 0) {
        getCrumbPath(path, config[i].children, info)
      }
    }
  }
}

export function getCrumbInfo(hash) {
  const loc = hash.split('/')
  const MENU = SIDERMENU
  let crumb = []
  /**
   * remove empty path 
   * eg: ['', 'a', 'b'] => ['a', 'b']
   */
  loc.shift()
  /**
   * first path of router contains '/'
   */
  loc[0] = '/' + loc[0]

  getCrumbPath(loc, MENU, crumb)

  return crumb
}
