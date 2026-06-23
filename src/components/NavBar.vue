<template>
  <nav class="navbar navbar-light navbar-expand-lg bg-white fixed-top py-2">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="/src/assets/img/logo.svg" alt="BIECHA-logo">
      </a>
      <button type="button" class="navbar-toggler btn border-0 rounded-0 position-relative" data-bs-toggle="collapse" data-bs-target="#navbarNav2" aria-controls="navbarNav2" aria-expanded="false" aria-label="Toggle navigation" @click="openHbSec">
        <i class="bi bi-list fs-1" :class="{'d-none': hbOpen}"></i>
        <i class="bi bi-x fs-1" :class="{'neutral-900': hbOpen, 'd-none': !hbOpen}"></i>
        <span
        class="position-absolute translate-middle p-1 bg-danger border border-light rounded-circle"
        :class="{'d-none': !cartNum || hbOpen}"
        style="z-index: 2; top: 25%; left: 70%;">
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav2">
        <ul class="navbar-nav ms-auto pt-3 Serif-TC endHeight">
          <li class="nav-item px-3 hb">
            <router-link to="/tea-intro" class="nav-link">
              <span class="d-block letter-spacing">茶品介紹</span>
              <span class="d-block">Tea Intro</span>
            </router-link>
          </li>
          <li class="nav-item px-3 hb">
            <router-link to="/news" class="nav-link">
              <span class="d-block letter-spacing">別茶消息</span>
              <span class="d-block">News</span>
            </router-link>
          </li>
          <li class="nav-item px-3 hb">
            <router-link to="/about" class="nav-link">
              <span class="d-block letter-spacing">關於別茶</span>
              <span class="d-block">About</span>
            </router-link>
          </li>
          <li class="nav-item px-3 hb">
            <router-link to="/favorites" class="nav-link">
              <span class="d-block letter-spacing">收藏列表</span>
              <span class="d-block">Favorites</span>
            </router-link>
          </li>
          <li class="nav-item px-3 hb">
            <router-link to="/cart" class="nav-link">
              <div class="d-flex">
                <div class="col">
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="d-block letter-spacing">購物車</span>
                    <span class="badge rounded-pill bg-danger fs-sm firstNegative" v-if="cartNum !== 0">
                      {{ cartNum }}
                    </span>
                  </div>
                  <span class="d-block">Cart</span>
                </div>
                <div class="col-auto m-auto">
                  <span class="badge rounded bg-danger secNegative" v-if="cartNum !== 0">
                    {{ cartNum }}
                  </span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<!-- <script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'
export default {
  data () {
    return {
      hbOpen: false
    }
  },
  computed: {
    ...mapState(cartStore, ['cartNum'])
  },
  mounted () {
    this.getCarts()
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']),
    openHbSec () {
      if (this.hbOpen !== true) {
        this.hbOpen = true
      } else {
        this.hbOpen = false
      }
    }
  }
}
</script> -->
<script setup>
import useCartStore from '@/stores/cartStore'
import { ref, computed, onMounted } from 'vue'
const cartStore = useCartStore()
const hbOpen = ref(false)
const cartNum = computed(() => cartStore.cartNum)
const getCarts = () => {
  cartStore.getCarts()
}
const openHbSec = () => {
  hbOpen.value = !hbOpen.value
}
onMounted(() => {
  getCarts()
})

</script>

<style>
.secNegative{
  display: none;
}
@media screen and (max-width: 991px) {
  .firstNegative{
    display: none;
  }
  .secNegative{
    display: block;
  }
}
</style>
