<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../assets/avatar.jpg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">登录</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                filled
                v-model="loginInfo.username"
                label="账号"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="loginInfo.pwd"
                label="密码"
                lazy-rules
              />

              <div class="row">
                <div class="col-3">
                  <q-btn
                    label="登录"
                    @click="onSubmit"
                    type="button"
                    color="primary"
                  />
                </div>
                <div class="col-3">
                  <q-btn
                    label="注册"
                    to="/register"
                    type="button"
                    color="primary"
                  />
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { login } from 'src/api/loginReq'
export default {
  data () {
    return {
      loading: false,
      loginInfo: {
        username: '',
        pwd: ''
      }
    }
  },
  methods: {
    onSubmit (values) {
      this.loading = true
      login(this.loginInfo).then(response => {
        console.log(response)
        if (response.code === 0) {
          console.log(response.data)
          localStorage.setItem('x-token', response.data.token)
          localStorage.setItem('username', response.data.username)
          this.$router.push('/')
        } else {
          this.$notify({
            group: 'common',
            // title: "系统错误",
            text: response.msg,
            type: 'error'
          })
        }
      })
      this.loading = false
    }
  }
}
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
