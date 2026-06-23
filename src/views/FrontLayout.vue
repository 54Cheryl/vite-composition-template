<template>
  <a href="">
    <i class="bi bi-arrow-up-circle position-fixed neutral-300" :class="{'d-none': !iconShow}" style="font-size: 2.5rem; z-index: 3; bottom: 3%; right: 2%;" @click.prevent="backTop"></i>
  </a>
  <RouterView :key="$route.path"></RouterView>
</template>

<!-- <script>
import { RouterView } from 'vue-router'
export default {
  components: {
    RouterView
  },
  data () {
    return {
      iconShow: false
    }
  },
  methods: {
    backTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    scrollDown () {
      const twentyFive = (window.innerHeight) * 0.25
      if (window.pageYOffset > twentyFive) {
        this.iconShow = true
      } else {
        this.iconShow = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollDown)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.scrollDown)
  }
}
</script> -->
<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const iconShow = ref(false)
const backTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const scrollDown = () => {
  const twentyFive = (window.innerHeight) * 0.25
  if (window.pageYOffset > twentyFive) {
    iconShow.value = true
  } else {
    iconShow.value = false
  }
}
onMounted(() => {
  window.addEventListener('scroll', scrollDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollDown)
})
</script>