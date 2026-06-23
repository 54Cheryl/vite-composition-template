<template>
  <NavBar />
  <div style="padding-top: 90px; padding-bottom: 6vh;">
    <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 180px;">
      <div class="position-absolute" style="top:0; bottom: 0; left: 0; right: 0; background-image: url(https://images.unsplash.com/photo-1550450339-e7a4787a2074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80); background-position: center center; opacity: 1;"></div>
    </div>
    <div class="container">
      <div class="row justify-content-center pt-5 px-4 mx-lg-5">
        <div class="col-md-6 bg-all">
          <h2 class="text-center Serif-TC my-4">訂單內容</h2>
          <div v-if="getCart.carts" class="pe-2" style="max-height: 40vh; overflow-x: hidden;">
            <div class="d-flex mt-4 bg-white" v-for="item in getCart.carts" :key="item.id">
              <img class="object-cover" :src="item.product.imageUrl" :alt="item.product.title" style="width: 120px; height: 120px;">
              <div class="w-100 p-3 position-relative Sans-TC">
                <p class="mb-0 fw-bold">{{ item.product.title }}</p>
                <p class="mb-0 mt-1 neutral-500" style="font-size: 14px;">
                  <small class="text-success" v-if="item.product.price !== item.product.origin_price">促銷價：</small><small v-else>單價：</small>{{ $filters.currency(item.product.price) }} /{{ item.product.unit }}
                </p>
                <div class="d-flex justify-content-between mt-1">
                  <p class="mb-0">
                    數量：{{ item.qty }}
                  </p>
                  <p class="mb-0">NT$ {{ $filters.currency(item.total) }}</p>
                </div>
              </div>
            </div>
          </div>
          <template v-if="!cartNum">
            <div class="px-3 mt-4 Sans-TC">
              您目前尚未選購產品
            </div>
          </template>
          <div class="px-3">
            <table class="table mt-4 neutral-500 Sans-TC">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 font-weight-normal">小計</th>
                  <td class="text-end border-0 px-0">NT$ {{ $filters.currency(getCart.total) }}</td>
                </tr>
                <tr v-if="getCart.total !== getCart.final_total">
                  <th scope="row" class="border-0 px-0 pt-0 font-weight-normal">折扣金額</th>
                  <td class="text-end accent-color border-0 px-0 pt-0">-{{ $filters.currency( getCart.total - getCart.final_total ) }}</td>
                </tr>
              </tbody>
            </table>
            <div class="input-group mb-3 input-group-sm ms-auto">
              <input
                type="text"
                class="form-control Sans-TC"
                v-model="coupon_code"
                placeholder="請輸入優惠碼"
                style="border-top-left-radius: 0; border-bottom-left-radius: 0;"
              />
              <div class="input-group-append">
                <button
                  type="button"
                  style="padding-left: 1.5rem;"
                  class="btn btn-custom Serif-TC"
                  @click="addCouponCode"
                >
                  套用優惠碼
                </button>
              </div>
            </div>
            <div class="d-flex justify-content-between mt-4 mb-4 Sans-TC">
              <p class="mb-0 h4 fw-bold">總計</p>
              <p class="mb-0 h4 fw-bold">NT$ {{ $filters.currency(getCart.final_total) }}</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 bg-sec">
          <h2 class="text-center Serif-TC my-4">客戶資訊</h2>
          <div class="pb-3">
            <VForm ref="formRef" class="px-3 m-auto" v-slot="{ errors }">
              <div class="mb-3">
                <label for="email" class=" form-label Serif-TC">Email<small class="accent-color ps-1">*</small></label>
                <VField
                  id="email"
                  name="email"
                  type="email"
                  class="form-control Sans-TC rounded-0"
                  placeholder="請輸入 Email"
                  :class="{ 'is-invalid': errors['email'] }"
                  rules="email|required"
                  v-model="form.user.email"
                ></VField>
                <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="name" class=" form-label Serif-TC">收件人姓名<small class="accent-color ps-1">*</small></label>
                <VField
                  id="name"
                  name="姓名"
                  type="text"
                  class="form-control Sans-TC rounded-0"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名"
                  rules="required"
                  v-model="form.user.name"
                ></VField>
                <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="tel" class=" form-label Serif-TC">收件人電話<small class="accent-color ps-1">*</small></label>
                <VField
                  id="tel"
                  name="電話"
                  type="tel"
                  class="form-control Sans-TC rounded-0"
                  :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入手機號碼"
                  :rules="isPhone"
                  v-model="form.user.tel"
                ></VField>
                <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="address" class=" form-label Serif-TC">收件人地址<small class="accent-color ps-1">*</small></label>
                <VField
                  id="address"
                  name="地址"
                  type="text"
                  class="form-control Sans-TC rounded-0"
                  :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請輸入地址"
                  rules="required"
                  v-model="form.user.address"
                ></VField>
                <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="message" class=" form-label Serif-TC">備註</label>
                <textarea
                  id="message"
                  class="form-control Sans-TC rounded-0"
                  cols="30"
                  rows="5"
                  v-model="form.message"
                ></textarea>
              </div>
            </VForm>
          </div>
        </div>
        <div class="row justify-content-between m-0 px-0" style="padding-top: 4vh;">
          <router-link to="/cart" class="btn btn-outline-n500 Serif-TC col-5 col-md-auto">回到購物車</router-link>
          <button type="button" @click.prevent="() => createOrder()" class="btn btn-custom Serif-TC col-5 col-md-auto" style="padding-left: 1.5rem;">送出訂單</button>
        </div>
      </div>
    </div>
  </div>
  <FrontFooter />
</template>

<!-- <script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'
import { Toast, Swal } from '@/methods/swalToast'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: 'couponAll8'
    }
  },
  computed: {
    ...mapState(cartStore, ['getCart', 'cartNum'])
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']),
    addCouponCode () {
      if (this.cartNum) {
        const coupon = {
          code: this.coupon_code
        }
        this.$http.post(`${VITE_APP_URL}api/${VITE_APP_PATH}/coupon`, { data: coupon })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              title: '套用優惠券'
            })
            this.getCarts()
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: err.response.data.message,
              confirmButtonColor: '#ab7e52'
            })
          })
      } else {
        Toast.fire({
          icon: 'warning',
          title: '請先選購產品'
        })
      }
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '須為正確的手機號碼 (ex：0912345678)'
    },
    createOrder () {
      const order = this.form
      this.$http.post(`${VITE_APP_URL}api/${VITE_APP_PATH}/order`, { data: order })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.$refs.form.resetForm()
          this.form.message = ''
          this.coupon_code = ''
          this.getCarts()
          this.linkToPay(res.data.orderId)
        })
        .catch(() => {
          if (this.cartNum === 0) {
            Swal.fire({
              icon: 'error',
              title: '您尚未選購產品',
              text: '請您將產品加入購物車後，再次送出訂單，謝謝!',
              confirmButtonColor: '#ab7e52'
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: '客戶資訊漏填',
              text: '請將客戶資訊填寫完整後，再次送出訂單，謝謝!',
              confirmButtonColor: '#ab7e52'
            })
          }
        })
    },
    linkToPay (orderId) {
      this.$router.push(`/pay/${orderId}`)
    }
  },
  components: {
    NavBar,
    FrontFooter
  },
  mounted () {
    this.getCarts()
  }
}
</script> -->
<script setup>
import cartStore from '@/stores/cartStore'
import { Toast, Swal } from '@/methods/swalToast'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const store = cartStore()
const router = useRouter()
const form = ref({
  user: {
    name: '',
    email: '',
    tel: '',
    address: ''
  },
  message: ''
})
const coupon_code = ref('couponAll8')
const formRef = ref(null)
const getCart = computed(() => store.getCart)
const cartNum = computed(() => store.cartNum)
const addCouponCode = () => {
  if (cartNum.value) {
    const coupon = {
      code: coupon_code.value
    }
    axios.post(`${VITE_APP_URL}api/${VITE_APP_PATH}/coupon`, { data: coupon })
      .then((res) => {
        Toast.fire({
          icon: 'success',
          title: '套用優惠券'
        })
        store.getCarts()
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
          confirmButtonColor: '#ab7e52'
        })
      })
  } else {
    Toast.fire({
      icon: 'warning',
      title: '請先選購產品'
    })
  }
}
const isPhone = (value) => {
  const phoneNumber = /^(09)[0-9]{8}$/
  return phoneNumber.test(value) ? true : '須為正確的手機號碼 (ex：0912345678)'
}
const createOrder = () => {
  const order = form.value
  axios.post(`${VITE_APP_URL}api/${VITE_APP_PATH}/order`, { data: order })
    .then(res => {
      Toast.fire({
        icon: 'success',
        title: res.data.message
      })

      formRef.value?.resetForm()
      form.value.message = ''
      coupon_code.value = ''
      store.getCarts()
      linkToPay(res.data.orderId)
    })
    .catch(() => {
      if (cartNum.value === 0) {
        Swal.fire({
          icon: 'error',
          title: '您尚未選購產品',
          text: '請您將產品加入購物車後，再次送出訂單，謝謝!',
          confirmButtonColor: '#ab7e52'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: '客戶資訊漏填',
          text: '請將客戶資訊填寫完整後，再次送出訂單，謝謝!',
          confirmButtonColor: '#ab7e52'
        })
      }
    })
}
const linkToPay = (orderId) => {
  router.push(`/pay/${orderId}`)
}
onMounted(() => {
  store.getCarts()
})
</script>