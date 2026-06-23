<template>
  <NavBar />
  <div class="container mt-md-5" style="padding-top: 90px;">
    <div class="row mx-4">
      <div class="col-lg-5">
        <div class="text-center overflow-hidden position-relative">
          <a class="text-danger" style="cursor: pointer;">
            <i v-if="isFavorite(product)" @click="() => toggleFavorite(product)" class="bi bi-heart-fill fs-4 position-absolute" style="right: 16px; top: 16px"></i>
            <i v-else @click="() => toggleFavorite(product)" class="bi bi-heart fs-4 position-absolute" style="right: 16px; top: 16px"></i>
          </a>
          <img :src="mainImg" :alt="product.title" class="card-img-top rounded-0 object-cover mainImg">
        </div>
        <div class="row my-4">
          <div class="col-3 text-center overflow-hidden">
            <img :src="product.imageUrl" :alt="product.title" class="card-img-top rounded-0 object-cover smImg" @click.prevent="() => showImg(product.imageUrl)">
          </div>
          <div class="col-3 text-center overflow-hidden" v-for="(imgItem, i) in product.imagesUrl" :key="i">
            <img :src="imgItem" :alt="product.title" class="card-img-top rounded-0 object-cover smImg" @click.prevent="() => showImg(imgItem)">
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white px-0 mb-0 pb-3 Serif-TC">
            <li class="breadcrumb-item neutral-300"><router-link to="/products" class="text-muted">全部產品</router-link></li>
            <li class="breadcrumb-item neutral-300"><router-link to="/tea-intro" class="text-muted">茶品介紹</router-link></li>
            <li class="breadcrumb-item neutral-300"><router-link :to="`/category/${product.category}`" class="text-muted">{{product.category}}</router-link></li>
            <li class="breadcrumb-item active neutral-500" aria-current="page">{{ product.title }}</li>
          </ol>
        </nav>
        <h2 class="fw-bold h1 mb-3 Serif-TC">{{ product.title }}</h2>
        <div class="d-flex mb-2">
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 bg-sec">產地</p>
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1">{{ product.origin_place }}</p>
        </div>
        <div class="d-flex mb-2">
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 bg-sec">品種</p>
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1">{{ product.variety }}</p>
        </div>
        <div class="d-flex mb-2">
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 bg-sec">香氣</p>
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1">{{ product.aroma }}</p>
        </div>
        <div class="d-flex mb-2">
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 bg-sec">滋味</p>
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1">{{ product.taste }}</p>
        </div>
        <div class="d-flex mb-2">
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 bg-sec">茶乾</p>
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1">{{ product.tea_dried }}</p>
        </div>
        <div class="d-flex mb-2">
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 bg-sec d-flex align-items-center">說明</p>
          <p class="card-text neutral-500 mb-0 Sans-TC px-3 py-1 w-75">{{ product.content }}</p>
        </div>
        <div class="mt-3 Sans-TC">
          <p class="fs-5 mb-0 text-muted" v-if="product.origin_price !== product.price"><del>NT$ {{ product.origin_price }}</del></p>
          <p class="fs-3 fw-bold accent-color">NT$ {{ product.price }}<span class="fs-5 mb-0"> /{{ product.unit }}</span></p>
        </div>
        <div class="my-3 col-12 col-md-6 qty-pe">
          <p class="fs-5 Serif-TC mb-2">數量</p>
          <div class="input-group align-items-center">
            <div class="input-group-prepend">
              <button
                type="button"
                class="btn btn-outline-custom p-2"
                :class="{ 'neutral-900': tempQty === 1 }"
                :disabled="tempQty === 1"
                @click="() => tempQty--"
              ><i class="fas fa-minus"></i></button>
            </div>
            <input
              type="number"
              class="form-control text-center p-2" placeholder=""
              style="border: 1px solid #292524;"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              v-model.number="tempQty"
              min="1"
            >
            <div class="input-group-append">
              <button
              type="button"
              class="btn btn-outline-custom p-2"
              @click="() => tempQty++"><i class="fas fa-plus"></i></button>
            </div>
          </div>
        </div>
        <div class="row align-items-center p-0 pt-3">
          <div class="col-md-6 pb-3">
            <button type="button" class="btn btn-outline-n500 Serif-TC letter-spacing w-100" v-if="isFavorite(product)" @click="() => toggleFavorite(product)">取消收藏</button>
            <button type="button" class="btn btn-outline-accent Serif-TC letter-spacing w-100" v-else @click="() => toggleFavorite(product)">加入收藏</button>
          </div>
          <div class="col-md-6 pb-3">
            <button type="button" class="btn btn-custom Serif-TC letter-spacing w-100" :disabled="product.id === loadingItem" @click="() => addToCart(product.id, tempQty)"><i class="fas fa-spinner fa-pulse me-2" v-if="loadingItem === product.id"></i>加入購物車</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3 mx-4 row justify-content-between">
      <div class="accordion col-12 col-md-5 py-0 px-2">
        <h2 class="accordion-header">
          <button
          type="button"
          class="accordion-button Serif-TC fs-4"
          data-bs-toggle="collapse" data-bs-target="#collapseDelivery" aria-expanded="false" aria-controls="collapseExample">
            送貨方式
          </button>
        </h2>
        <div class="collapse show" id="collapseDelivery">
          <div class="card card-body border-0 Sans-TC px-0">
            <ul>
              <li>新竹物流宅配</li>
              <li>黑貓宅配</li>
              <li>7-11 取貨</li>
              <li>全家 取貨</li>
              <li>跨境宅配</li>
              <li>7-11 跨境門市取貨</li>
              <li>郵局航空包裹</li>
              <li>郵局宅配（台灣離島地區）</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="accordion col-12 col-md-7 py-0 px-2">
        <h2 class="accordion-header">
          <button
          type="button"
          class="accordion-button Serif-TC fs-4"
          data-bs-toggle="collapse" data-bs-target="#collapseDescription" aria-expanded="false" aria-controls="collapseDescription">
            產品描述
          </button>
        </h2>
        <div class="collapse show" id="collapseDescription">
          <div class="card card-body border-0 Sans-TC">
            {{product.description}}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" style="padding-bottom: 6vh; margin-top: 15vh;">
    <div class="row mx-4">
      <div class="tel-use">
        <div class="d-flex col-md-2">
          <div class="col-auto ps-3 position-relative">
            <img src="/src/assets/img/left.svg" alt="title-icon-img" class="position-absolute" style="left: -0.1rem; top: -1rem;">
            <h3 class="letter-spacing Serif-TC mb-0 neutral-900">相關產品</h3>
            <span class="text-center fs-7 Serif-TC mt-4 neutral-900">Related Products</span>
          </div>
          <div class="col m-auto ps-3">
            <p class="bg-n500 m-auto" style="height: 1px;"></p>
          </div>
        </div>
      </div>
      <div class="col-md-auto other-use px-0">
        <div class="d-flex" style="max-height: 40vh;" data-aos="fade-up" data-aos-duration="1000">
          <div class="ms-4">
            <div class="d-flex position-relative">
              <img src="/src/assets/img/left.svg" alt="title-icon-img" class="position-absolute" style="right: 0.5rem; top: 0.3rem;">
              <h3 class="letter-spacing Serif-TC mt-4 mx-0 writing-lr neutral-900">相關產品
              </h3>
              <span class="text-left fs-7 Serif-TC writing-lr mt-4 pt-4 neutral-900">Related Products</span>
            </div>
            <p class="bg-n500 m-auto" style="width: 1px; height: 15vh;"></p>
          </div>
        </div>
      </div>
      <div class="row col-md-10 d-flex justify-content-left m-auto pt-5" data-aos="fade-up" data-aos-duration="1000">
        <div class="col-md-5 col-lg-3 mb-5 d-flex align-items-stretch justify-content-center" v-for="product in otherProducts" :key="product.id">
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
    </div>
  </div>
  <FrontFooter />
</template>

<!-- <script>
import { Swal } from '@/methods/swalToast'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import favoritesStore from '@/stores/favoritesStore'
import { getRandomProductsByCategory } from '@/methods/RandomProducts'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      product: {},
      tempQty: 1,
      mainImg: '',
      otherProducts: []
    }
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
    getProduct () {
      const { id } = this.$route.params
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
          this.mainImg = res.data.product.imageUrl
          this.getOtherProduct()
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    },
    getOtherProduct () {
      const currentCategory = this.product.category
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/?category=${currentCategory}`)
        .then((res) => {
          const category = res.data.products
          const randomProducts = getRandomProductsByCategory(category, this.product.id)
          this.otherProducts = randomProducts
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    },
    showImg (url) {
      this.mainImg = url
    },
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(favoritesStore, ['isFavorite', 'toggleFavorite', 'removeFavorite'])
  },
  components: {
    NavBar,
    FrontFooter
  },
  mounted () {
    this.getProduct()
  }
}
</script> -->
<script setup>
import { Swal } from '@/methods/swalToast'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
import cartStoreDef from '@/stores/cartStore'
import favoritesStoreDef from '@/stores/favoritesStore'
import { getRandomProductsByCategory } from '@/methods/RandomProducts'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
const cartStore = cartStoreDef()
const favoritesStore = favoritesStoreDef()
const route = useRoute()
const product = ref({})
const tempQty = ref(1)
const mainImg = ref('')
const otherProducts = ref([])
const favoritesList = computed(() => favoritesStore.favoritesList)
const loadingItem = computed(() => cartStore.loadingItem)
watch(favoritesList, () => {
  localStorage.setItem('favoritesList', JSON.stringify(favoritesList.value))
}, { deep: true })
const getProduct = () => {
  const { id } = route.params
  axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
    .then((res) => {
      product.value = res.data.product
      mainImg.value = res.data.product.imageUrl
      getOtherProduct()
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
        confirmButtonColor: '#ab7e52'
      })
    })
}
const getOtherProduct = () => {
  const currentCategory = product.value.category
  axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/?category=${currentCategory}`)
    .then((res) => {
      const category = res.data.products
      const randomProducts = getRandomProductsByCategory(category, product.value.id)
      otherProducts.value = randomProducts
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
        confirmButtonColor: '#ab7e52'
      })
    })
}
const showImg = (url) => {
  mainImg.value = url
}
const addToCart = (id, qty = 1) => {
  cartStore.addToCart(id, qty)
}
const isFavorite = (item) => {
  return favoritesStore.isFavorite(item)
}
const toggleFavorite = (item) => {
  favoritesStore.toggleFavorite(item)
}
const removeFavorite = (item) => {
  favoritesStore.removeFavorite(item)
}
onMounted(() => {
  getProduct()
})
</script>

<style>
.mainImg{
  height: 56vh;
}
.smImg{
  height: 13vh;
}
.qty-pe{
  padding-right: 0.75rem;
}
@media screen and (max-width: 991px) {
  .mainImg{
    height: 49vh;
  }
  .smImg{
    height: 12vh;
  }
}
@media screen and (max-width: 575px) {
  .mainImg{
    height: 39vh;
  }
  .smImg{
    height: 7vh;
  }
  .qty-pe{
    padding-right: 0rem;
  }
}
</style>
