<template>
  <Loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage">
    <div class="loadingio-spinner-spin-ekq2gap1645"><div class="ldio-kyayy0fncmo"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div>
  </Loading>
  <div class="container" style="margin-top: 7vh;">
    <div class="pt-5">
      <div class="d-flex justify-content-between">
        <p class="mb-0 px-2 d-flex align-items-center">本頁有 <span>{{ products.length }}</span> 項產品</p>
        <div class="text-end">
          <button type="button" class="btn btn-custom text-light" @click="() => openProduct('new', item)" style="padding-left: 1.5rem;">新增產品</button>
        </div>
      </div>
      <table class="table table-hover mt-2">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th width="150">產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="150">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in products" v-bind:key="item.id">
            <td width="120">{{ item.category }}</td>
            <td width="150">{{ item.title }}</td>
            <td width="120">
              {{ $filters.currency(item.origin_price) }}
            </td>
            <td width="120">
              {{ $filters.currency(item.price) }}
            </td>
            <td width="150">
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td width="120">
              <button type="button" class="btn btn-outline-main btn-sm me-2 backendBtn" @click="() => openProduct('edit', item)">編輯</button>
              <button type="button" class="btn btn-outline-accent btn-sm" @click="() => openProduct('delete', item)" style="padding: 0.25rem 0.5rem;">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col">
          <Pagination :pages="pagination" @change-page="getProducts"></Pagination>
        </div>
        <ProdModal
          :product="tempProduct"
          :isNew="isNew"
          ref="productModal"
          @update-product ="updateProduct"
          @cancel-product ="cancelProduct"
          @create-images ="createImages"
        ></ProdModal>
        <DelModal
          :temp-data="tempProduct"
          ref="deleteModal"
          @del-data="deleteProduct"
        ></DelModal>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import Pagination from '@/components/PaginationView.vue'
import DelModal from '@/components/DelModal.vue'
import ProdModal from '@/components/ProdModal.vue'
import { Toast, Swal } from '@/methods/swalToast'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  props: ['token'],
  data () {
    return {
      products: [],
      pagination: {},
      isNew: false,
      tempProduct: {
        imagesUrl: [],
        tempImage: ''
      },
      isLoading: false,
      fullPage: true
    }
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.$http.get(`${VITE_APP_URL}api/${VITE_APP_PATH}/admin/products/?page=${page}`)
        .then((res) => {
          this.isLoading = false
          this.products = res.data.products
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
    openProduct (event, item) {
      if (event === 'new') {
        this.isNew = true
        this.tempProduct = {
          imagesUrl: [],
          is_enabled: 0
        }
        this.$refs.productModal.showModal()
      } else if (event === 'edit') {
        this.isNew = false
        this.tempProduct = { ...item }
        this.$refs.productModal.showModal()
      } else if (event === 'delete') {
        this.tempProduct = { ...item }
        this.$refs.deleteModal.showModal()
      }
    },
    cancelProduct () {
      this.tempProduct = { imagesUrl: [] }
      this.$refs.productModal.hideModal()
    },
    updateProduct () {
      let api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/product`
      let apiMethod = 'post'
      if (!this.isNew) {
        api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`
        apiMethod = 'put'
      }
      this.tempProduct.tempImage = ''
      this.$http[apiMethod](api, { data: this.tempProduct })
        .then((res) => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.tempProduct = {
            imagesUrl: [],
            tempImage: ''
          }
          this.$refs.productModal.hideModal()
          this.getProducts()
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    },
    createImages () {
      this.tempProduct.imagesUrl.push('')
    },
    deleteProduct () {
      const deleteUrl = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(deleteUrl)
        .then((res) => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.$refs.deleteModal.hideModal()
          this.getProducts()
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
    ProdModal,
    Loading
  },
  mounted () {
    this.getProducts()
  }
}
</script> -->
<script setup>
import Pagination from '@/components/PaginationView.vue'
import DelModal from '@/components/DelModal.vue'
import ProdModal from '@/components/ProdModal.vue'
import { Toast, Swal } from '@/methods/swalToast'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { defineProps, ref, onMounted } from 'vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const props = defineProps({
  token: String
})
const products = ref([])
const pagination = ref({})
const isNew = ref(false)
const tempProduct = ref({
  imagesUrl: [],
  tempImage: ''
})
const isLoading = ref(false)
const fullPage = ref(true)
const getProducts = (page = 1) => {
  isLoading.value = true
  axios.get(`${VITE_APP_URL}api/${VITE_APP_PATH}/admin/products/?page=${page}`)
    .then((res) => {
      isLoading.value = false
      products.value = res.data.products
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
const productModal = ref(null)
const deleteModal = ref(null)

const openProduct = (event, item) => {
  if (event === 'new') {
    isNew.value = true
    tempProduct.value = {
      imagesUrl: [],
      is_enabled: 0
    }
    productModal.value?.showModal()
  } else if (event === 'edit') {
    isNew.value = false
    tempProduct.value = { ...item }
    productModal.value?.showModal()
  } else if (event === 'delete') {
    tempProduct.value = { ...item }
    deleteModal.value?.showModal()
  }
}
const cancelProduct = () => {
  tempProduct.value = { imagesUrl: [] }
  productModal.value?.hideModal()
}
const updateProduct = () => {
  let api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/product`
  let apiMethod = 'post'
  if (!isNew.value) {
    api = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/product/${tempProduct.value.id}`
    apiMethod = 'put'
  }
  tempProduct.value.tempImage = ''
  axios[apiMethod](api, { data: tempProduct.value })
    .then((res) => {
      Toast.fire({
        icon: 'success',
        title: res.data.message
      })
      tempProduct.value = {
        imagesUrl: [],
        tempImage: ''
      }
      productModal.value?.hideModal()
      getProducts()
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
        confirmButtonColor: '#ab7e52'
      })
    })
}
const createImages = () => {
  tempProduct.value.imagesUrl.push('')
}
const deleteProduct = () => {
  const deleteUrl = `${VITE_APP_URL}api/${VITE_APP_PATH}/admin/product/${tempProduct.value.id}`
  axios.delete(deleteUrl)
    .then((res) => {
      Toast.fire({
        icon: 'success',
        title: res.data.message
      })
      deleteModal.value?.hideModal()
      getProducts()
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
  getProducts()
})
</script>