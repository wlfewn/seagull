<style lang="scss" scoped>
  @import '~@scss';
  .border{
    @include border;
    background-color: $white;
    padding: .5rem 2.5rem 0rem 1.5rem !important;
    // @extend .border-radius-s;
  }
  .h2{
    @extend .align-center;
    color: lighten($black, 20%);
  }
  .el-form {
    height: 100%;
    background-color: #2d3a4b;
  }
  .el-col {
    border-radius: $px-s;
  }
  /** 去除红色的* */
  .el-form-item {
    /deep/ .el-form-item__label::before {
      content: '';
    }
  }
</style>

<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="right" label-width="4rem">
    <el-row :gutter="10"  style="margin:0; padding-top: 10%">
        <el-col :xs="18" :sm="9" :md="7" class="border el-col-sm-offset-8 el-col-xs-offset-3 ">
          <h2 class="h2">用户登录</h2>
          <el-form-item class="padding-bottom-m" label="用户名" prop="name">
            <el-input v-model="ruleForm.name" type="text" ></el-input>
          </el-form-item>

          <el-form-item class="padding-bottom-m" label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>

          <el-form-item label="" class="padding-top-m">
            <el-button type="primary" class="button" :loading="loading" v-on:click="submit">登 录</el-button>
          </el-form-item>
        </el-col>
    </el-row>
  </el-form>
</template>

<script>
// apis
import SystemApi from '@/apis/api-system'
// vuex
import { SystemDeed } from '@store-module/store-user'
import {LOGIN_PAGE, HOME_PAGE} from '@/router/router-system'
import { RouterDeeds } from '@store-module/store-router'

export default {
  name: 'v-login',
  desc: '登录界面',
  data () {
    return {
      // 表单数据
      ruleForm: {
        name: '',
        password: ''
      },
      // 是否显示登陆状态
      loading: false,
      // 验证规则
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      // 表单验证
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // console.log('按钮点击')
          this.loading = true
          // 登陆
          const form = {
            loginName: this.ruleForm.name,
            password: this.ruleForm.password
          }

          SystemApi.login(form).then((res) => {
            if (res) {
              // 用户信息, token 存入vuex
              this.$store.commit(SystemDeed.login, res.token, res)
              // 跳转
              // 函数参考 http://www.w3school.com.cn/jsref/jsref_decodeURIComponent.asp
              const redirectUrl = decodeURIComponent(this.$route.query.redirect || HOME_PAGE)
              // console.log('redirectUrl', redirectUrl)
              // 触发菜单加载
              this.$store.dispatch(RouterDeeds.initRouters)
              if (redirectUrl) {
                if (LOGIN_PAGE === redirectUrl) { // 等于登录路由
                  this.$router.push(HOME_PAGE)
                } else {
                  this.$router.push(redirectUrl)
                }
              } else { // 没有内容，直接跳转首页
                this.$router.push(HOME_PAGE)
              }
            }
          }).catch((reason) => {
            // 登陆失败 , 显示 toast 弹窗
            if (reason) {
              this.$message.error(reason)
            }
          })
        }
      })
    }
  }
}
</script>
