import Mock from 'mockjs'
import mockLoginAPI from './mock-user'

// 登录相关
Mock.mock(/\/user\/login/, 'post', mockLoginAPI.login)
