<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
    <div class="container">
      <router-link to="/admin" class="navbar-brand pb-0">
        <img src="/src/assets/img/whiteLogo.svg" alt="BIECHA-logo" class="object-cover" style="width: 90px;">
      </router-link>
      <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-0 pt-2">
          <li class="nav-item py-3">
            <router-link to="/admin/products" class="nav-link Serif-TC">產品管理</router-link>
          </li>
          <li class="nav-item py-3">
            <router-link to="/admin/orders" class="nav-link Serif-TC">訂單管理</router-link>
          </li>
          <li class="nav-item py-3">
            <router-link to="/admin/coupons" class="nav-link Serif-TC">優惠券管理</router-link>
          </li>
          <li class="nav-item py-3">
            <router-link to="/" class="nav-link Serif-TC">回到前台</router-link>
          </li>
        </ul>
        <form class="d-flex pt-2">
          <a href="#" @click.prevent="logout" class="text-decoration-none Serif-TC p-md-2 logout">登出</a>
        </form>
      </div>
    </div>
  </nav>
  <RouterView v-if="checkSuccess"></RouterView>
</template>

<!-- <script>
import { RouterView } from 'vue-router'
import { Toast, Swal } from '@/methods/swalToast'
const { VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  components: {
    RouterView
  },
  methods: {
    logout () {
      document.cookie = 'cherylToken=; expires=;'
      this.$router.push('/login')
    },
    checkLogin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)cherylToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`
        this.$http.post(`${VITE_APP_URL}api/user/check`, { api_token: token })
          .then((res) => {
            this.checkSuccess = true
            if (!res.data.success) {
              this.$router.push('/login')
            }
            Toast.fire({
              icon: 'success',
              title: '登入成功'
            })
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: err.response.data.message,
              confirmButtonColor: '#ab7e52'
            })
            this.$router.push('/login')
          })
      } else {
        Toast.fire({
          icon: 'warning',
          title: '請先登入'
        })
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script> -->
<script setup>
import { RouterView } from 'vue-router'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { Toast, Swal } from '@/methods/swalToast'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
const { VITE_APP_URL } = import.meta.env
const router = useRouter()
const checkSuccess = ref(false)
const logout = () => {
  document.cookie = 'cherylToken=; expires=;'
  router.push('/login')
}
const checkLogin = () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)cherylToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  if (token) {
    axios.defaults.headers.common.Authorization = `${token}`
    axios.post(`${VITE_APP_URL}api/user/check`, { api_token: token })
      .then((res) => {
        checkSuccess.value = true
        if (!res.data.success) {
          router.push('/login')
        }
        Toast.fire({
          icon: 'success',
          title: '登入成功'
        })
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
          confirmButtonColor: '#ab7e52'
        })
        router.push('/login')
      })
  } else {
    Toast.fire({
      icon: 'warning',
      title: '請先登入'
    })
    router.push('/login')
  }
}
onMounted(() => {
  checkLogin()
})
</script>