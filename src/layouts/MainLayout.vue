<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <img
            width="20"
            height="20"
            src="../assets/linux-512x512.png"
          />杨桃看板
        </q-toolbar-title>

        <div>v{{ $q.version }}</div>
        <div>
          <q-btn-dropdown stretch flat :label="username">
            <q-list>
              <q-item clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar>
                    <img src="../assets/avatar.jpg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                  <q-item-label caption>February 22, 2016</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          v-bind:data-id="link.link"
          :link="link.link"
        />
        <q-item
          clickable
          v-ripple
          @click="loginOut"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>

          <q-item-section>退出</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { loginOut } from 'src/api/loginReq'

const linksData = [
  {
    title: '关于我',
    caption: 'visonforcoding.github.io',
    icon: 'record_voice_over',
    link: 'https://visonforcoding.github.io'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      username: localStorage.getItem('username')
    }
  },
  created () {},
  methods: {
    loginOut (values) {
      loginOut(this.loginInfo).then(response => {
        console.log(response)
        if (response.code === 0) {
          sessionStorage.clear()
          this.$router.push('/login')
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
