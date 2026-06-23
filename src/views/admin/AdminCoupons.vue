<template>
  <Loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage">
    <div class="loadingio-spinner-spin-ekq2gap1645"><div class="ldio-kyayy0fncmo"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div>
  </Loading>
  <div class="container" style="margin-top: 7vh;">
    <div class="pt-5">
      <div class="d-flex justify-content-between">
        <p class="mb-0 px-2 d-flex align-items-center">本頁有 <span>{{ coupons.length }}</span> 項產品</p>
        <div class="text-end">
          <button type="button" class="btn btn-custom text-light" @click="() => openCoupon('new', item)" style="padding-left: 1.5rem;">新增優惠券</button>
        </div>
      </div>
      <table class="table table-hover mt-2">
        <thead>
          <tr>
            <th width="150">優惠券名稱</th>
            <th width="120">折扣百分比</th>
            <th width="120">到期日</th>
            <th width="120">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" v-bind:key="item.id">
            <td width="150">{{ item.title }}</td>
            <td width="120">{{ item.percent }}</td>
            <td width="120">
              {{ $filters.date(item.due_date) }}
            </td>
            <td width="120">
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td width="120">
              <button type="button" class="btn btn-outline-main btn-sm me-2 backendBtn" @click="() => openCoupon('edit', item)">編輯</button>
              <button type="button" class="btn btn-outline-accent btn-sm" @click="() => openCoupon('delete', item)" style="padding: 0.25rem 0.5rem;">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col">
          <Pagination :pages="pagination" @change-page="getCoupons"></Pagination>
        </div>
        <CouponModal
          :coupon="tempCoupon"
          :isNew="isNew"
          ref="couponModal"
          @update-coupon ="updateCoupon"
        ></CouponModal>
        <DelModal
          :temp-data="tempCoupon"
          ref="deleteModal"
          @del-data="deleteCoupon"
        ></DelModal>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import Pagination from '@/components/PaginationView.vue'
import DelModal from '@/components/DelModal.vue'
import CouponModal from '@/components/CouponModal.vue'
import { Toast, Swal } from '@/methods/swalToast'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  props: ['token'],
  data () {
    return {
      coupons: [],
      pagination: {},
      isNew: false,
      tempCoupon: {},
      isLoading: false,
      fullPage: true
    }
  },
  methods: {
    getCoupons (page = 1) {
      this.isLoading = true
      this.$http.get(`${VITE_APP_URL}api/${VITE_APP_PATH}/admin/coupons/?page=${page}`)
        .then((res) => {
          this.isLoading = false
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    },
    openCoupon (event, item) {
      if (event === 'new') {
        this.isNew = true
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0
        }
        this.$refs.couponModal.showModal()
      } else if (event === 'edit') {
        this.isNew = false
        this.tempCoupon = { ...item }
        this.$refs.couponModal.showModal()
      } else if (event === 'delete') {
        this.tempCoupon = { ...item }
        this.$refs.deleteModal.showModal()
      }
    },
    updateCoupon () {
      const today = Math.floor(new Date() / 1000)
      if (this.tempCoupon.due_date < today) {
        Swal.fire({
          icon: 'error',
          title: '輸入錯誤',
          text: '不可輸入過去日期',
          confirmButtonColor: '#ab7e52'
        })
      } else if (this.tempCoupon.percent > 100 || this.tempCoupon.percent < 0) {
        Swal.fire({
          icon: 'error',
          title: '輸入錯誤',
          text: '折扣百分比只能為0~100',
          confirmButtonColor: '#ab7e52'
        })
      } else {
        let api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/coupon`
        let apiMethod = 'post'
        if (!this.isNew) {
          api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
          apiMethod = 'put'
        }
        this.$http[apiMethod](api, { data: this.tempCoupon })
          .then((res) => {
            Toast.fire({
              icon: 'success',
              title: res.data.message
            })
            this.tempCoupon = {}
            this.$refs.couponModal.hideModal()
            this.getCoupons()
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: err.response.data.message,
              confirmButtonColor: '#ab7e52'
            })
          })
      }
    },
    deleteCoupon () {
      const deleteUrl = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http.delete(deleteUrl)
        .then((res) => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.$refs.deleteModal.hideModal()
          this.getCoupons()
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    }
  },
  components: {
    Pagination,
    DelModal,
    Loading,
    CouponModal
  },
  mounted () {
    this.getCoupons()
  }
}
</script> -->
<script setup>
import Pagination from '@/components/PaginationView.vue'
import DelModal from '@/components/DelModal.vue'
import CouponModal from '@/components/CouponModal.vue'
import { Toast, Swal } from '@/methods/swalToast'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { defineProps, ref, onMounted } from 'vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const props = defineProps({
  token: String
})
const coupons = ref([])
const pagination = ref({})
const isNew = ref(false)
const tempCoupon = ref({})
const isLoading = ref(false)
const fullPage = ref(true)
const couponModal = ref(null)
const deleteModal = ref(null)

const getCoupons = (page = 1) => {
  isLoading.value = true
  axios.get(`${VITE_APP_URL}api/${VITE_APP_PATH}/admin/coupons/?page=${page}`)
    .then((res) => {
      isLoading.value = false
      coupons.value = res.data.coupons
      pagination.value = res.data.pagination
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
        confirmButtonColor: '#ab7e52'
      })
    })
}
const openCoupon = (event, item) => {
  if (event === 'new') {
    isNew.value = true
    tempCoupon.value = {
      due_date: new Date().getTime() / 1000,
      is_enabled: 0
    }
    couponModal.value?.showModal()
  } else if (event === 'edit') {
    isNew.value = false
    tempCoupon.value = { ...item }
    couponModal.value?.showModal()
  } else if (event === 'delete') {
    tempCoupon.value = { ...item }
    deleteModal.value?.showModal()
  }
}
const updateCoupon = () => {
  const today = Math.floor(new Date() / 1000)
  if (tempCoupon.value.due_date < today) {
    Swal.fire({
      icon: 'error',
      title: '輸入錯誤',
      text: '不可輸入過去日期',
      confirmButtonColor: '#ab7e52'
    })
  } else if (tempCoupon.value.percent > 100 || tempCoupon.value.percent < 0) {
    Swal.fire({
      icon: 'error',
      title: '輸入錯誤',
      text: '折扣百分比只能為0~100',
      confirmButtonColor: '#ab7e52'
    })
  } else {
    let api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/coupon`
    let apiMethod = 'post'
    if (!isNew.value) {
      api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/coupon/${tempCoupon.value.id}`
      apiMethod = 'put'
    }
    axios[apiMethod](api, { data: tempCoupon.value })
      .then((res) => {
        Toast.fire({
          icon: 'success',
          title: res.data.message
        })
        tempCoupon.value = {}
        couponModal.value?.hideModal()
        getCoupons()
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
const deleteCoupon = () => {
  const deleteUrl = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/coupon/${tempCoupon.value.id}`
  axios.delete(deleteUrl)
    .then((res) => {
      Toast.fire({
        icon: 'success',
        title: res.data.message
      })
      deleteModal.value?.hideModal()
      getCoupons()
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
        confirmButtonColor: '#ab7e52'
      })
    })
}
onMounted(() => {
  getCoupons()
})
</script>