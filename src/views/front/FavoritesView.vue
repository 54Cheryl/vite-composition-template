<template>
  <div class="d-flex flex-column" style="height: 100vh;">
    <NavBar />
    <div class="bg-all flex-grow-1 d-flex flex-column justify-content-between" style="padding-top: 90px;">
      <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 180px;">
        <div class="position-absolute" style="top:0; bottom: 0; left: 0; right: 0; background-image: url(https://images.unsplash.com/photo-1550450339-e7a4787a2074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80); background-position: center center; opacity: 1;"></div>
      </div>
      <div class="container flex-grow-1 pb-5 pt-3">
        <div class="row py-4 px-0 justify-content-center h-100">
          <div class="tel-use" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-delay="100" data-aos-offset="0">
            <div class="d-flex col-md-2">
              <div class="col-auto ps-3 position-relative">
                <img src="/src/assets/img/right.svg" alt="title-icon-img" class="position-absolute" style="left: -0.1rem; top: -1rem;">
                <h3 class="letter-spacing Serif-TC mb-0 neutral-900">收藏列表</h3>
                <span class="text-center fs-7 Serif-TC mt-4 neutral-900">Favorites</span>
              </div>
              <div class="col m-auto ps-3">
                <p class="bg-n500 m-auto" style="height: 1px;"></p>
              </div>
            </div>
          </div>
          <div class="col-md-auto other-use px-0">
            <div class="d-flex" style="max-height: 40vh;">
              <div class="mx-4">
                <div class="d-flex position-relative" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-offset="0">
                  <img src="/src/assets/img/left.svg" alt="title-icon-img" class="position-absolute" style="right: 0.5rem; top: 0.3rem;">
                  <h3 class="letter-spacing Serif-TC mt-4 mx-0 writing-lr neutral-900">收藏列表
                  </h3>
                  <span class="text-left fs-7 Serif-TC writing-lr mt-4 pt-4 neutral-900" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-offset="0">Favorites</span>
                </div>
                <p class="bg-n500 m-auto" style="width: 1px; height: 15vh;" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-offset="0" data-aos-delay="100"></p>
              </div>
            </div>
          </div>
          <div v-if="getFavoritesNum !== 0" class="row col-md-10 flex-grow-1" data-aos="fade-up" data-aos-duration="1000">
            <div class="col-lg-3 col-md-4 mb-5 d-flex align-items-stretch justify-content-center" v-for="product in favoritesList" :key="product.id" data-aos="fade-up" data-aos-duration="400">
              <div class="card shadow-custom border-0 rounded-0 position-relative" style="width: 18rem;">
                <a class="text-danger" style="cursor: pointer;">
                  <i v-if="isFavorite(product)" @click="() => toggleFavorite(product)" class="bi bi-heart-fill fs-4 position-absolute" style="right: 16px; top: 16px"></i>
                  <i v-else @click="() => toggleFavorite(product)" class="bi bi-heart fs-4 position-absolute" style="right: 16px; top: 16px"></i>
                </a>
                <router-link :to="`/product/${product.id}`" class="card-body d-flex flex-column text-decoration-none p-0">
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
          <div v-else class="row col-md-10 flex-grow-1" data-aos="fade-up" data-aos-duration="1000">
            <div class="d-flex justify-content-center align-items-center">
              <p class="px-3 mt-4 Sans-TC fs-3 accent-color letter-spacing">
                您尚未收藏任何產品
              </p>
            </div>
            <div class="text-center">
              <a href="/vite-template/#/products" class="Serif-TC letter-spacing text-center btn btn-outline-custom m-auto" style="padding-left: 2rem;">產品總覽</a>
            </div>
          </div>
        </div>
        <div v-if="getFavoritesNum !== 0" class="pb-5 mb-5 text-center">
          <a href="/vite-template/#/products" class="Serif-TC letter-spacing text-center btn btn-outline-custom m-auto" style="padding-left: 2rem;">產品總覽</a>
        </div>
      </div>
      <FrontFooter />
    </div>
  </div>
</template>

<!-- <script>
import { mapState, mapActions } from 'pinia'
import favoritesStore from '@/stores/favoritesStore'
import cartStore from '@/stores/cartStore'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
export default {
  components: {
    NavBar,
    FrontFooter
  },
  computed: {
    ...mapState(favoritesStore, ['favoritesList', 'getFavoritesNum']),
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
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(favoritesStore, ['isFavorite', 'toggleFavorite', 'removeFavorite'])
  }
}
</script> -->

<script setup>
import favoritesStore from '@/stores/favoritesStore'
import cartStore from '@/stores/cartStore'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
const { favoritesList, getFavoritesNum, isFavorite, toggleFavorite, removeFavorite } = favoritesStore()
const { loadingItem, addToCart } = cartStore()
import { watch } from 'vue'
watch(favoritesList, () => {
  localStorage.setItem('favoritesList', JSON.stringify(favoritesList.value))
}, { deep: true })

</script>