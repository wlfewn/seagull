/**
 * 封装axios 的http请求
 * 参考 https://github.com/zaofeng/just_for_base/blob/master/vue/main.js
 * https://www.npmjs.com/package/axios
 */
import axios from 'axios'
import store from 'store' // 缓存操作
import SystemStore, { SystemDeed } from '@store-module/store-user' // 系统用户行为
import router from '@/router'
// 登录路径
import { LOGIN_PAGE } from '@/router/router-system'
// 客户自定义异常
const responseStatus = {
  /** token 禁止访问 */
  FORBIDDEN_TOKEN: 500403,
  /** token 无效 */
  INVALID_TOKEN: 50001
}

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // 获取用户token
  const token = store.get('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}` // 模板语法
  }
  return config // 返回配置信息
}, (error) => {
  // 对请求错误做些什么
  console.log('错误的传参', error)
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((res) => {
  // 对响应状态处理
  // console.log('axios response', res)
  // console.log('axios response status', res.status)
  if (res.status !== 200) {
    // console.log('res.status !== 200')
    return Promise.reject(res.data)
  }
  // console.log('axios response data', res.data)
  return res.data
}, (error) => {
  console.log('axios error response', error)
  if (error.response) {
    switch (error.response.status) {
      // 如果token 过期，提醒用户重新登陆
      case responseStatus.INVALID_TOKEN:
        // 401 清除token信息并跳转到登录页面
        SystemStore.commit(SystemDeed.logout)
        // 只有在当前路由不是登录页面才跳转
        if (router.currentRoute.path !== LOGIN_PAGE) {
          // 跳转到登陆页面
          router.replace({
            path: LOGIN_PAGE,
            query: { redirect: router.currentRoute.path }
          })
        }
    }
  }
  return Promise.reject(error.data)
})

axios.defaults.baseURL = 'api'
// 设置默认请求头
// axios.defaults.headers = {
//   'X-Requested-With': 'XMLHttpRequest'
// }
// 设置请求过时时间
axios.defaults.timeout = 5000

let createAxios = (config = {}) => {
  // config 拼接具体url
  // config.url = process.env.PROXY_API + config.url
  // console.log('PROXY_API', process.env.PROXY_API)
  // console.log('config.url', config.url)
  return axios(config)
}

export default {
  // get请求
  get (url, param) {
    return createAxios({
      method: 'get',
      url: url,
      params: param
    })
  },
  // post请求
  post (url, param) {
    return createAxios({
      method: 'post',
      url: url,
      data: param
    })
  },
  // post 请求, 发送对象
  postJson (url, param) {
    return createAxios({
      method: 'post',
      url: url,
      data: param,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
