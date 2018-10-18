import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from 'store'
//  element 国际化，使用webpack.base.conf.js的externals
import elementEnLocale from 'element-local-en' // element-ui lang
import elementZhLocale from 'element-local-zh-CN'// element-ui lang

import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en or zh
  locale: store.get('language') || 'en',
  // set locale messages
  messages
})

export default i18n
