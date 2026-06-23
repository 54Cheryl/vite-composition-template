<template>
  <router-view />
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
export default {
  mounted () {
    AOS.init()
  }
}
</script>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css")
</style>
