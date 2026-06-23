<template>
  <nav class="navbar navbar-expand-lg fixed-top py-2 desktopPx"
  :class="{
    'bg-opacity-20': !isScrolled,
    'bg-white': isScrolled || isOpen,
    'navbar-light': isScrolled,
    'navbar-dark': !isScrolled
    }">
    <div class="container">
      <a class="navbar-brand pb-0" href="#">
        <img src="/src/assets/img/logo.svg" alt="BIECHA-logo">
      </a>
      <button type="button" class="navbar-toggler btn text-white border-0 rounded-0 position-relative" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" @click="openHb">
        <i class="bi bi-list fs-1" :class="{'d-none': isOpen, 'neutral-900': isScrolled}"></i>
        <i class="bi bi-x fs-1" :class="{'neutral-900': isOpen, 'd-none': !isOpen}"></i>
        <span
        class="position-absolute translate-middle p-1 bg-danger border border-light rounded-circle"
        :class="{'d-none': !cartNum || isOpen}"
        style="z-index: 2; top: 25%; left: 70%;">
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto pt-3 Serif-TC endHeight">
          <li class="nav-item px-3 hb">
            <router-link to="/tea-intro" class="nav-link writing-nav" :class="{'nav-textshadow': !isScrolled}">
              <span class="d-block letter-spacing" :class="{'hb-navColor': isOpen}">茶品介紹</span>
              <span class="d-block" :class="{'hb-navColor': isOpen}">Tea Intro</span>
            </router-link>
          </li>
          <li class="nav-item px-3 hb">
            <router-link to="/news" class="nav-link writing-nav" :class="{'nav-textshadow': !isScrolled}">
              <span class="d-block letter-spacing" :class="{'hb-navColor': isOpen}">別茶消息</span>
              <span class="d-block" :class="{'hb-navColor': isOpen}">News</span>
            </router-link>
          </li>
          <li class="nav-item px-3 hb">
            <router-link to="/about" class="nav-link writing-nav" :class="{'nav-textshadow': !isScrolled}">
              <span class="d-block letter-spacing" :class="{'hb-navColor': isOpen}">關於別茶</span>
              <span class="d-block" :class="{'hb-navColor': isOpen}">About</span>
            </router-link>
          </li>
          <li class="nav-item px-3 hb">
            <router-link to="/favorites" class="nav-link writing-nav" :class="{'nav-textshadow': !isScrolled}">
              <span class="d-block letter-spacing" :class="{'hb-navColor': isOpen}">收藏列表</span>
              <span class="d-block" :class="{'hb-navColor': isOpen}">Favorites</span>
            </router-link>
          </li>
          <li class="nav-item px-3 hb">
            <router-link to="/cart" class="nav-link" :class="{'nav-textshadow': !isScrolled}">
              <div class="d-flex">
                <div class="col-10 endflex">
                  <span class="position-relative">
                    <span class="position-absolute topNegative start-50 translate-middle badge rounded-pill bg-danger fs-sm" v-if="cartNum !== 0">
                      {{ cartNum }}
                    </span>
                    <span class="d-block writing-nav letter-spacing" :class="{'hb-navColor': isOpen}">
                      購物車
                    </span>
                  </span>
                  <span class="d-block writing-nav" :class="{'hb-navColor': isOpen}">Cart</span>
                </div>
                <div class="col-auto m-auto endNegative">
                  <span class="badge rounded bg-danger" v-if="cartNum !== 0">
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
      isScrolled: false,
      isOpen: false
    }
  },
  computed: {
    ...mapState(cartStore, ['cartNum'])
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.getCarts()
  },
  methods: {
    handleScroll () {
      const ninety = (window.innerHeight) * 0.88
      if (window.pageYOffset > ninety) {
        this.isScrolled = true
      } else {
        this.isScrolled = false
      }
    },
    openHb () {
      if (this.isOpen !== true) {
        this.isOpen = true
      } else {
        this.isOpen = false
      }
    },
    ...mapActions(cartStore, ['getCarts'])
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script> -->
<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import useCartStore from '@/stores/cartStore'
const cartStore = useCartStore()
const isScrolled = ref(false)
const isOpen = ref(false)
const cartNum = computed(() => cartStore.cartNum)
const handleScroll = () => {
  const ninety = (window.innerHeight) * 0.88
  if (window.pageYOffset > ninety) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
}
const openHb = () => {
  isOpen.value = !isOpen.value
}
const getCarts = () => {
  cartStore.getCarts()
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  cartStore.getCarts()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@media screen and (min-width:992px){
  ::v-deep #navbarNav .navbar-nav .nav-textshadow:hover {
    text-shadow: -1px -1px 0 #4c3a27, 1px -1px 0 #4c3a27, -1px  1px 0 #4c3a27, 1px  1px 0 #4c3a27;
  }
}
</style>
