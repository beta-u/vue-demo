/* eslint-disable */
/**
 * all async components
 */

const SIDERBAR_PREFIX = '__sb__' /* shortcut for siderbar attrs*/
const COMMON_PREFIX = '__common__' /* shortcur for common attrs*/

let config = [{
  __sb__title: '首页',
  // __sb__icon_style: 'el-icon-home',
  // __sb__role: 'manager',
  // __sb__auth: [2],
  __common__path: '/home',
  __common__name: 'home',
  // component: home
}]

let siderConfig = [], router = []

/**
 * [getConfigs 拆分基础配置为组件配置]
 * @param  {[type]} s [array]
 * @param  {[type]} r [array]
 * @param  {[type]} v [object]
 * @return {[type]}   [null]
 */
function getConfigs(s, r, k, v){
  // v in [0, 1, 2, 3 ...] k {title, name, path ...}
  s[k] = {}
  r[k] = {}
  for (let i in v){
    // i in [title, name, path], v[i] in [home, home, /home]
    /** get config of siderbar **/
    if (i.startsWith(SIDERBAR_PREFIX)) {
      let key = i.replace(SIDERBAR_PREFIX, '')
      s[k][key] = v[i]
    }

    /** get config of common **/
    else if (i.startsWith(COMMON_PREFIX)) {
      let key = i.replace(COMMON_PREFIX, '')
      r[k][key] = v[i]
    }

    /** get config of routes **/
    else if (Object.prototype.toString.call(v[i]) !== '[object Array]') {
      r[k][i] = v[i]
    }

    /** get config recurisve **/
    else {
      s[k][i] = []
      r[k][i] = []
      v[i].map((_v, _k) => {
        getConfigs(s[k][i], r[k][i], _k, _v)
      })
    }
  }
}

config.map((v, k) => {
  getConfigs(siderConfig, router, k, v)
})

export const ROUTER = {
  routes: router
}

export const SIDERMENU = siderConfig
