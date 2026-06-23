<template>
  <Loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage">
    <div class="loadingio-spinner-spin-ekq2gap1645"><div class="ldio-kyayy0fncmo"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div>
  </Loading>
  <NavBar />
  <div class="bg-all" style="padding-top: 90px; padding-bottom: 6vh;">
    <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 180px;">
      <div class="position-absolute" style="top:0; bottom: 0; left: 0; right: 0; background-image: url(https://images.unsplash.com/photo-1550450339-e7a4787a2074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80); background-position: center center; opacity: 1;"></div>
    </div>
    <div class="container mt-4">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-all px-0 mb-0 pb-3">
          <li class="breadcrumb-item text-primary Serif-TC" aria-current="page">全部產品</li>
          <li class="breadcrumb-item Serif-TC"><router-link class="neutral-300 text-decoration-none" to="/tea-intro">茶品介紹</router-link></li>
          <li class="breadcrumb-item dropdown Serif-TC">
            <a class="text-decoration-none neutral-300 dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              茶品類別
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><router-link to="/category/紅茶" class="dropdown-item neutral-300">紅茶</router-link></li>
              <li><router-link to="/category/綠茶" class="dropdown-item neutral-300">綠茶</router-link></li>
              <li><router-link to="/category/青茶" class="dropdown-item neutral-300">青茶</router-link></li>
              <li><router-link to="/category/黑茶" class="dropdown-item neutral-300">黑茶</router-link></li>
            </ul>
          </li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-lg-3 col-md-4 mb-5 d-flex align-items-stretch justify-content-center" v-for="product in products" :key="product.id" data-aos="fade-up" data-aos-duration="400">
          <div class="card shadow-custom border-0 rounded-0 position-relative" style="width: 18rem;">
            <a class="text-danger" style="cursor: pointer;">
              <i v-if="isFavorite(product)" @click="() => toggleFavorite(product)" class="bi bi-heart-fill fs-4 position-absolute" style="right: 16px; top: 16px; z-index: 5;"></i>
              <i v-else @click="() => toggleFavorite(product)" class="bi bi-heart fs-4 position-absolute" style="right: 16px; top: 16px; z-index: 5;"></i>
            </a>
            <router-link :to="`/product/${product.id}`" class="card-body d-flex flex-column text-decoration-none p-0 position-relative">
              <div class="prodHover">
                <p class="Serif-TC letter-spacing fs-5 text-center px-3 py-2 text-white bg-opacity-65 w-100">點擊查看</p>
              </div>
              <img :src="product.imageUrl" class="card-img-top object-cover productsImg" :alt="product.title">
              <h5 class="mb-0 neutral-900 Serif-TC text-center pb-2 pt-1">
                {{ product.title }}
              </h5>
              <div class="p-1">
                <div class="d-flex px-2 mb-2">
                  <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 bg-sec col-auto d-flex align-items-center">品種</p>
                  <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 col-10">{{ product.variety }}</p>
                </div>
                <div class="d-flex px-2 mb-2">
                  <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 bg-sec col-auto d-flex align-items-center">香氣</p>
                  <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 col-10">{{ product.aroma }}</p>
                </div>
                <div class="d-flex px-2 mb-2">
                  <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 bg-sec col-auto d-flex align-items-center">滋味</p>
                  <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 col-10">{{ product.taste }}</p>
                </div>
              </div>
              <div class="flex-grow-1 d-flex align-items-end">
                <p class="accent-color Sans-TC mb-0 px-3 pt-1 pb-2 fs-5">NT$ {{ product.price }}<small> /{{ product.unit }}</small></p>
              </div>
            </router-link>
            <button type="button" class="btn btn-custom Serif-TC letter-spacing w-100" :disabled="product.id === loadingItem" @click="() => addToCart(product.id)"><i class="fas fa-spinner fa-pulse me-2" v-if="loadingItem === product.id"></i>加入購物車</button>
          </div>
        </div>
      </div>
      <Pagination :pages="pagination" @change-page="getProducts"></Pagination>
    </div>
  </div>
  <FrontFooter />
</template>

<!-- <script>
import { RouterLink } from 'vue-router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { Swal } from '@/methods/swalToast'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import favoritesStore from '@/stores/favoritesStore'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
import Pagination from '@/components/PaginationView.vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      products: [],
      pagination: {},
      isLoading: false,
      fullPage: true
    }
  },
  components: {
    RouterLink,
    Loading,
    NavBar,
    FrontFooter,
    Pagination
  },
  computed: {
    ...mapState(favoritesStore, ['favoritesList']),
    ...mapState(cartStore, ['loadingItem'])
  },
  watch: {
    favoritesList: {
      handler () {
        localStorage.setItem('favoritesList', JSON.stringify(this.favoritesList))
      },
      deep: true
    }
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/?page=${page}`)
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
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(favoritesStore, ['isFavorite', 'toggleFavorite', 'removeFavorite'])
  },
  mounted () {
    this.getProducts()
  }
}
</script> -->
<script setup>
import { useRoute } from 'vue-router'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { Swal } from '@/methods/swalToast'
import useCartStore from '@/stores/cartStore'
import useFavoritesStore from '@/stores/favoritesStore'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
import Pagination from '@/components/PaginationView.vue'
import { ref, onMounted, computed, watch } from 'vue'
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
const route = useRoute()
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const products = ref([])
const pagination = ref({})
const isLoading = ref(false)
const fullPage = ref(true)
const favoritesList = computed(() => favoritesStore.favoritesList)
const loadingItem = computed(() => cartStore.loadingItem)
watch(favoritesList, () => {
  localStorage.setItem('favoritesList', JSON.stringify(favoritesList.value))
}, { deep: true })
const getProducts = (page = 1) => {
  isLoading.value = true
  axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/?page=${page}`)
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
const addToCart = (productId) => {
  cartStore.addToCart(productId)
}
const isFavorite = (product) => {
  return favoritesStore.isFavorite(product)
}
const toggleFavorite = (product) => {
  favoritesStore.toggleFavorite(product)
}
const removeFavorite = (product) => {
  favoritesStore.removeFavorite(product)
}
onMounted(() => {
  getProducts()
})
</script>