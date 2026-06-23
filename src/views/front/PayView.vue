<template>
  <NavBar />
  <div class="" style="padding-top: 90px; padding-bottom: 6vh; min-height: 95vh;">
    <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 180px;">
      <div class="position-absolute" style="top:0; bottom: 0; left: 0; right: 0; background-image: url(https://images.unsplash.com/photo-1550450339-e7a4787a2074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80); background-position: center center; opacity: 1;"></div>
    </div>
    <div v-if="order.is_paid" class="container h-100" style="height: 52vh;">
      <div class="row justify-content-center px-4 mx-lg-5 mt-lg-5 d-flex flex-column">
        <h1 class="text-center Serif-TC letter-spacing m-0 py-5 neutral-900"><i class="bi bi-check2-circle text-success"></i> 付款成功，訂單已成立!</h1>
        <p class="text-center Sans-TC fs-3 neutral-700">訂單編號：<span class="accent-color">{{ order.id }}</span></p>
        <p class="text-center Sans-TC fs-3 neutral-700"><i class="bi bi-stars pe-2"></i>感謝您的訂購！非常感激您對我們產品的信任和支持。</p>
        <p class="text-center Sans-TC fs-3 neutral-700">您的滿意是我們最大的追求，期待為您提供更優質的服務。</p>
        <div class="row col-md-auto justify-content-between m-0 px-0 flex-grow-1" style="padding-top: 4vh;">
          <router-link to="/products" class="btn btn-outline-n500 Serif-TC col-5 col-md-auto">繼續購物</router-link>
          <router-link to="/" class="btn btn-custom Serif-TC col-5 col-md-auto text-decoration-none" style="padding-left: 1.5rem;">回到首頁</router-link>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div class="row justify-content-between px-4 pt-5 mx-lg-5">
        <h1 class="text-center Serif-TC letter-spacing m-0 accent-color"><i class="bi bi-exclamation-circle"></i> 提醒您!訂單尚未完成</h1>
        <p class="text-center Sans-TC letter-spacing m-0 pt-3 fs-4">請於下方選譯付款方式後，按下<span class="text-primary fw-bolder">確認付款</span>，即可完成訂購!</p>
      </div>
      <div class="row justify-content-center pt-5 px-4 mx-lg-5">
        <div class="col-md-6 bg-all">
          <h2 class="text-center Serif-TC my-4">訂單明細</h2>
          <div class="pe-2" style="max-height: 84vh; overflow-x: hidden;">
            <div class="d-flex mt-4 bg-white" v-for="(product, i) in order.products" :key="i">
              <img class="object-cover" :src="product.product.imageUrl" :alt="product.product.title" style="width: 120px; height: 120px;">
              <div class="w-100 p-3 position-relative Sans-TC">
                <p class="mb-0 fw-bold">{{ product.product.title }}</p>
                <p class="mb-0 mt-1 neutral-500" style="font-size: 14px;">
                  <small>售價：</small>{{ $filters.currency(product.product.price) }} /{{ product.product.unit }}
                </p>
                <div class="d-flex justify-content-between mt-1">
                  <p class="mb-0">
                    數量：{{ product.qty }}
                  </p>
                  <p class="mb-0">NT$ {{ $filters.currency(product.total) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="px-3">
            <table class="table mt-4 neutral-500 Sans-TC">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 font-weight-normal">小計</th>
                  <td class="text-end border-0 px-0" v-if="originTotal !== 0">NT$ {{ $filters.currency(originTotal) }}</td>
                  <td class="text-end border-0 px-0" v-else>NT$ {{ $filters.currency(order.total) }}</td>
                </tr>
                <tr v-if="originTotal !== 0">
                  <th scope="row" class="border-0 px-0 pt-0 font-weight-normal">折扣金額</th>
                  <td class="text-end accent-color border-0 px-0 pt-0">{{ order.total-originTotal }}</td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-4 mb-4 Sans-TC">
              <p class="mb-0 h4 fw-bold">總計</p>
              <p class="mb-0 h4 fw-bold">NT$ {{ $filters.currency(order.total) }}</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 bg-sec">
          <h2 class="text-center Serif-TC my-4">客戶資訊</h2>
          <div class="pb-3">
            <div class="px-3 m-auto">
              <div class="mb-3">
                <p class="Serif-TC mb-1">Email：</p>
                <p class="Sans-TC">{{ user.email }}</p>
              </div>
              <div class="mb-3">
                <p class="Serif-TC mb-1">收件人姓名：</p>
                <p class="Sans-TC">{{ user.name }}</p>
              </div>
              <div class="mb-3">
                <p class="Serif-TC mb-1">收件人電話：</p>
                <p class="Sans-TC">{{ user.tel }}</p>
              </div>
              <div class="mb-3">
                <p class="Serif-TC mb-1">收件人地址：</p>
                <p class="Sans-TC">{{ user.address }}</p>
              </div>
            </div>
          </div>
          <h2 class="text-center Serif-TC my-4">訂單資訊</h2>
          <div class="pb-3">
            <div class="px-3 m-auto">
              <div class="mb-3">
                <p class="Serif-TC mb-1">訂單日期：</p>
                <p class="Sans-TC">{{ $filters.date(order.create_at) }}</p>
              </div>
              <div class="mb-3">
                <p class="Serif-TC mb-1">訂單編號：</p>
                <p class="Sans-TC">{{ order.id }}</p>
              </div>
              <div class="mb-3">
                <p class="Serif-TC mb-1">訂單金額：</p>
                <p class="Sans-TC">NT$ {{ $filters.currency(order.total) }}</p>
              </div>
              <div class="mb-3">
                <p class="Serif-TC mb-1">付款狀態：</p>
                <p class="Sans-TC text-success fs-5 m-0" v-if="order.is_paid">付款完成</p>
                <p class="Sans-TC accent-color fs-5 m-0" v-else>尚未付款</p>
              </div>
              <div class="mb-3">
                <p class="Serif-TC mb-1">付款方式：</p>
                <form class="col col-12">
                  <select name="" id="" class="form-select Sans-TC" v-model="payMethod" style="border-radius: 0;">
                    <option selected disabled>請選擇</option>
                    <option value="貨到付款">貨到付款</option>
                    <option value="銀行轉帳/ATM">銀行轉帳/ATM</option>
                    <option value="信用卡">信用卡</option>
                    <option value="LINE_Pay">LINE Pay</option>
                  </select>
                </form>
              </div>
              <div class="mb-3" v-if="order.message">
                <p class="Serif-TC mb-1">訂單備註：</p>
                <p class="Sans-TC">{{ order.message }}</p>
              </div>
              <div class="mb-3">
                <button type="button" class="btn btn-custom Sans-TC w-100" style="padding-left: 1.5rem;" @click="payConfirm">確認付款</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-if="order.is_paid" class="row justify-content-between px-4 mx-lg-5" style="padding-top: 4vh;">
        <router-link to="/products" class="btn btn-outline-n500 Serif-TC col-6 col-md-auto">繼續購物</router-link>
        <router-link to="/" class="btn btn-custom Serif-TC col-6 col-md-auto text-decoration-none" style="padding-left: 1.5rem;">回到首頁</router-link>
      </div> -->
    </div>
  </div>
  <FrontFooter />
</template>

<!-- <script>
import { Toast, Swal } from '@/methods/swalToast'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      order: {},
      orderId: '',
      user: {},
      payProducts: [],
      originTotal: 0,
      payMethod: '請選擇'
    }
  },
  methods: {
    getOrder () {
      const { orderId } = this.$route.params
      this.$http.get(`${VITE_APP_URL}api/${VITE_APP_PATH}/order/${orderId}`)
        .then((res) => {
          this.order = res.data.order
          this.orderId = res.data.order.id
          this.user = res.data.order.user
          const defaultProducts = res.data.order.products
          this.payProducts = Object.keys(defaultProducts).map(function (_) { return defaultProducts[_] })
          if (this.payProducts[0]?.coupon?.percent !== undefined) {
            const orderPercent = this.payProducts[0].coupon.percent
            this.originTotal = parseInt(this.order.total / orderPercent * 100)
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    },
    payConfirm () {
      if (this.order.is_paid) {
        Swal.fire({
          icon: 'warning',
          title: '您已付款完成',
          confirmButtonColor: '#ab7e52'
        })
      } else {
        if (this.payMethod !== '請選擇') {
          this.$http.post(`${VITE_APP_URL}api/${VITE_APP_PATH}/pay/${this.orderId}`)
            .then((res) => {
              Toast.fire({
                icon: 'success',
                title: res.data.message
              })
              this.getOrder()
            })
            .catch((err) => {
              Swal.fire({
                icon: 'error',
                title: err.response.data.message,
                confirmButtonColor: '#ab7e52'
              })
            })
        } else {
          Swal.fire({
            icon: 'warning',
            title: '請先選擇付款方式',
            confirmButtonColor: '#ab7e52'
          })
        }
      }
    }
  },
  components: {
    NavBar,
    FrontFooter
  },
  mounted () {
    this.getOrder()
  }
}
</script> -->
<script setup>
import { Toast, Swal } from '@/methods/swalToast'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
const order = ref({})
const orderId = ref('')
const user = ref({})
const payProducts = ref([])
const originTotal = ref(0)
const payMethod = ref('請選擇')
const route = useRoute()
const getOrder = () => {
  const { orderId: routeOrderId } = route.params
  axios.get(`${VITE_APP_URL}api/${VITE_APP_PATH}/order/${routeOrderId}`)
    .then((res) => {
      order.value = res.data.order
      orderId.value = res.data.order.id
      user.value = res.data.order.user
      const defaultProducts = res.data.order.products
      payProducts.value = Object.keys(defaultProducts).map(function (_) { return defaultProducts[_] })
      if (payProducts.value[0]?.coupon?.percent !== undefined) {
        const orderPercent = payProducts.value[0].coupon.percent
        originTotal.value = parseInt(order.value.total / orderPercent * 100)
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
        confirmButtonColor: '#ab7e52'
      })
    })
}
const payConfirm = () => {
  if (order.value.is_paid) {
    Swal.fire({
      icon: 'warning',
      title: '您已付款完成',
      confirmButtonColor: '#ab7e52'
    })
  } else {
    if (payMethod.value !== '請選擇') {
      axios.post(`${VITE_APP_URL}api/${VITE_APP_PATH}/pay/${orderId.value}`)
        .then((res) => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          getOrder()
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    } else {
      Swal.fire({
        icon: 'warning',
        title: '請先選擇付款方式',
        confirmButtonColor: '#ab7e52'
      })
    }
  }
}
onMounted(() => {
  getOrder()
})
</script>