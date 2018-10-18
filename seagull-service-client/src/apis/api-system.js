import http from '@http'

export default {

  login(form = {}) {
    return http.postJson('/user/login', form)
  }
}
