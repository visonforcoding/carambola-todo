<template>
  <div id="q-app">
    <router-view />
    <notifications class="notify" group="common" />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
* {

}
.mg10 {
  margin-top: 5px;
}
.mb10 {
  margin-bottom: 5px;
}
.notify {
  // Style of the notification itself
  margin-top: 5%;

  .notification-title {
    // Style for title line
  }

  .notification-content {
    // Style for content
  }

  &.my-type {
    /*
    Style for specific type of notification, will be applied when you
    call notification with "type" parameter:
    this.$notify({ type: 'my-type', message: 'Foo' })
    */
  }
}
</style>
