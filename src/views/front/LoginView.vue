<template>
  <div class="container">
    <form class="row justify-content-center align-content-center pb-5" @submit.prevent="login" style="height: 100vh;">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal Serif-TC text-center">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control rounded-0"
            placeholder="Email address"
            v-model="user.username"
            required
            autofocus
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control rounded-0"
            v-model="user.password"
            placeholder="Password"
            required
          />
        </div>
        <div class="text-end mt-4">
          <button type="submit" class="btn btn-lg btn-primary btn-block text-white w-100 rounded-0 Serif-TC mb-2" style="padding-left: 1.5rem;">
            登入
          </button>
          <router-link to="/" class="btn btn-outline-n500 rounded-0 Serif-TC w-100 fs-5">回首頁</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<!-- <script>
import { Swal } from '@/methods/swalToast'
const { VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.post(`${VITE_APP_URL}admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `cherylToken=${token}; expires=${new Date(expired)}`
          this.$router.push('/admin')
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    }
  }
}
</script> -->
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Swal } from '@/methods/swalToast'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter()
const { VITE_APP_URL } = import.meta.env
const user = ref({
  username: '',
  password: ''
})
const login = () => {
  axios.post(`${VITE_APP_URL}admin/signin`, user.value)
    .then((res) => {
      const { token, expired } = res.data
      document.cookie = `cherylToken=${token}; expires=${new Date(expired)}`
      router.push('/admin')
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
        confirmButtonColor: '#ab7e52'
      })
    })
}
</script>