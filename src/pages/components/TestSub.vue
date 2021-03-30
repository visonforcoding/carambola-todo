<template>
  <div>
     <span v-if="visible">hello,world</span>
  </div>
</template>

<script>
export default {
  name: 'TestSub',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: false
    }
  },
  watch: {
    visible () {
      console.log(this.visible)
      this.active = this.visible
    }
  }
}
</script>
