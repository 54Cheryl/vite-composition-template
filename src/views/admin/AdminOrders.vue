<template>
  <Loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage">
    <div class="loadingio-spinner-spin-ekq2gap1645"><div class="ldio-kyayy0fncmo"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div>
  </Loading>
  <div class="container" style="margin-top: 7vh;">
    <div class="pt-5">
      <p class="mb-0 px-2 d-flex align-items-center">本頁有 <span>{{ orders.length }}</span> 張訂單</p>
      <table class="table table-hover mt-2">
        <thead>
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th class="backend-use">購買品項</th>
            <th class="backend-use">應付金額</th>
            <th>是否付款</th>
            <th class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in orders" v-bind:key="item.id">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td>
              {{ item.user.email }}
            </td>
            <td class="backend-use">
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i" class="row mb-1">
                  <span class="col">
                    {{ product.product.title }}
                  </span>
                  <span class="col">
                    數量 : {{ product.qty }} {{ product.product.unit }}
                  </span>
                </li>
              </ul>
            </td>
            <td class="backend-use">
              $ {{ $filters.currency(item.total) }}
            </td>
            <td>
              <div class="form-check form-switch d-flex justify-content-center p-0">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="() => updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="d-flex justify-content-evenly">
                <button type="button" class="btn btn-outline-main btn-sm" @click="() => openOrder('edit', item)">檢視</button>
                <button type="button" class="btn btn-outline-accent btn-sm" @click="() => openOrder('delete', item)" style="padding: 0.25rem 0.5rem;">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col">
          <Pagination :pages="pagination" @change-page="getOrders"></Pagination>
        </div>
        <OrderModal
          :order="tempOrder"
          ref="orderModal"
          @update-order ="updateOrder"
          @cancel-order ="cancelOrder"
        ></OrderModal>
        <DelModal
          :temp-data="tempOrder"
          ref="deleteModal"
          @del-data="deleteOrder"
        ></DelModal>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import Pagination from '@/components/PaginationView.vue'
import DelModal from '@/components/DelModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import { Toast, Swal } from '@/methods/swalToast'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  props: ['token'],
  data () {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      isLoading: false,
      fullPage: true
    }
  },
  methods: {
    getOrders (page = 1) {
      this.isLoading = true
      this.$http.get(`${VITE_APP_URL}api/${VITE_APP_PATH}/admin/orders/?page=${page}`)
        .then((res) => {
          this.isLoading = false
          this.orders = res.data.orders
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
    updatePaid (item) {
      if (item.is_paid) {
        const paidDate = Math.floor(new Date() / 1000)
        item.paid_date = paidDate
      } else {
        item.paid_date = ''
      }
      const paid = {
        is_paid: item.is_paid,
        paid_date: item.paid_date
      }
      Toast.fire({
        icon: 'success',
        title: '已更新訂單資訊'
      })
      const api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/order/${item.id}`
      this.$http.put(api, { data: paid })
        .then((res) => {
          this.getOrders()
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    },
    openOrder (event, item) {
      if (event === 'edit') {
        this.tempOrder = { ...item }
        this.$refs.orderModal.showModal()
      } else if (event === 'delete') {
        this.tempOrder = { ...item }
        this.$refs.deleteModal.showModal()
      }
    },
    cancelOrder () {
      this.tempOrder = {}
      this.$refs.orderModal.hideModal()
    },
    updateOrder () {
      const api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/order/${this.tempOrder.id}`
      if (this.tempOrder.is_paid) {
        const paidDate = Math.floor(new Date() / 1000)
        this.tempOrder.paid_date = paidDate
      } else {
        this.tempOrder.paid_date = ''
      }
      this.$http.put(api, { data: this.tempOrder })
        .then((res) => {
          this.$refs.orderModal.hideModal()
          this.tempOrder = {}
          this.getOrders()
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    },
    deleteOrder () {
      const deleteUrl = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.$http.delete(deleteUrl)
        .then((res) => {
          this.$refs.deleteModal.hideModal()
          this.getOrders()
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
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
    OrderModal,
    Loading
  },
  mounted () {
    this.getOrders()
  }
}
</script> -->
<script setup>
import Pagination from '@/components/PaginationView.vue'
import DelModal from '@/components/DelModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import { Toast, Swal } from '@/methods/swalToast'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { ref, onMounted, defineProps } from 'vue'
import axios from 'axios'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const props = defineProps({
  token: String
})
const orders = ref([])
const pagination = ref({})
const tempOrder = ref({})
const isLoading = ref(false)
const fullPage = ref(true)

const getOrders = (page = 1) => {
  isLoading.value = true
  axios.get(`${VITE_APP_URL}api/${VITE_APP_PATH}/admin/orders/?page=${page}`)
    .then((res) => {
      isLoading.value = false
      orders.value = res.data.orders
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
const updatePaid = (item) => {
  if (item.is_paid) {
    const paidDate = Math.floor(new Date() / 1000)
    item.paid_date = paidDate
  } else {
    item.paid_date = ''
  }
  const paid = {
    is_paid: item.is_paid,
    paid_date: item.paid_date
  }
  Toast.fire({
    icon: 'success',
    title: '已更新訂單資訊'
  })
  const api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/order/${item.id}`
  axios.put(api, { data: paid })
    .then((res) => {
      getOrders()
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
        confirmButtonColor: '#ab7e52'
      })
    })
}
const orderModal = ref(null)
const deleteModal = ref(null)
const openOrder = (event, item) => {
  if (event === 'edit') {
    tempOrder.value = { ...item }
    orderModal.value?.showModal()
  } else if (event === 'delete') {
    tempOrder.value = { ...item }
    deleteModal.value?.showModal()
  }
}
const cancelOrder = () => {
  tempOrder.value = {}
  orderModal.value?.hideModal()
}
const updateOrder = () => {
  const api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/order/${tempOrder.value.id}`
  if (tempOrder.value.is_paid) {
    const paidDate = Math.floor(new Date() / 1000)
    tempOrder.value.paid_date = paidDate
  } else {
    tempOrder.value.paid_date = ''
  }
  axios.put(api, { data: tempOrder.value })
    .then((res) => {
      orderModal.value?.hideModal()
      tempOrder.value = {}
      getOrders()
      Toast.fire({
        icon: 'success',
        title: res.data.message
      })
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
        confirmButtonColor: '#ab7e52'
      })
    })
}
const deleteOrder = () => {
  const deleteUrl = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/order/${tempOrder.value.id}`
  axios.delete(deleteUrl)
    .then((res) => {
      deleteModal.value?.hideModal()
      getOrders()
      Toast.fire({
        icon: 'success',
        title: res.data.message
      })
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
  getOrders()
})
</script>

<style>
@media screen and (max-width: 575px) {
  .backend-use{
    display: none;
  }
}
</style>
