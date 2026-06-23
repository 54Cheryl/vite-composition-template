<template>
  <div class="d-flex flex-column" style="height: 100vh;">
    <NavBar />
    <div class="flex-grow-1 d-flex flex-column justify-content-between" style="padding-top: 90px;">
      <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 180px;">
        <div class="position-absolute" style="top:0; bottom: 0; left: 0; right: 0; background-image: url(https://images.unsplash.com/photo-1550450339-e7a4787a2074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80); background-position: center center; opacity: 1;"></div>
      </div>
      <div class="container flex-grow-1">
        <div class="row justify-content-center h-100 py-5 px-lg-4 px-2 mx-lg-5">
          <div class="col-md-6 bg-all">
            <h2 class="text-center Serif-TC my-4">購物車列表</h2>
            <div class="text-end pt-2 px-3 pb-4">
              <button type="button" style="padding-left: 1.5rem;" class="btn btn-outline-accent Serif-TC" v-if="cartNum !== 0" @click="deleteCarts">
                清空購物車
              </button>
            </div>
            <div v-if="getCart.carts" class="pe-2" style="max-height: 40vh; overflow-x: hidden;">
              <div class="d-flex mb-4 bg-white" v-for="item in getCart.carts" :key="item.id">
                <router-link :to="`/product/${item.product.id}`" class="text-decoration-none">
                  <img class="object-cover" :src="item.product.imageUrl" alt="產品圖片" style="width: 120px; height: 120px;">
                </router-link>
                <div class="w-100 p-3 position-relative Sans-TC">
                  <button type="button" class="btn text-primary p-0 position-absolute border-0" style="top: 16px; right: 16px;" @click="() => deleteCartItem(item)" :disabled="item.id === loadingItem"><i class="fas fa-times"></i></button>
                  <p class="mb-0 fw-bold">{{ item.product.title }}</p>
                  <p class="mb-0 mt-1 neutral-500" style="font-size: 14px;">
                    <small class="text-success" v-if="item.product.price !== item.product.origin_price">促銷價：</small><small v-else>單價：</small>{{ $filters.currency(item.product.price) }} /{{ item.product.unit }}
                  </p>
                  <div class="d-flex justify-content-between align-items-center w-100">
                    <div class="input-group w-50 align-items-center">
                      <div class="input-group-prepend pe-1">
                        <button
                          type="button"
                          class="btn px-0 text-primary border-0"
                          :class="{ 'disabled text-secondary': item.qty === 1 }"
                          :disabled="item.id === loadingItem"
                          @click="() => minusCartQty(item)"
                        ><i class="fas fa-minus"></i></button>
                      </div>
                      <input
                        type="number"
                        class="form-control border-0 text-center my-auto shadow-none bg-white px-0" placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        v-model.number="item.qty"
                        min="1"
                        :disabled="item.id === loadingItem"
                        @change="() => updateCartItem(item)"
                      >
                      <div type="button" class="input-group-append ps-1">
                        <button type="button" class="btn px-0 text-primary border-0" :disabled="item.id === loadingItem" @click="() => plusCartQty(item)"><i class="fas fa-plus"></i></button>
                      </div>
                    </div>
                    <p class="mb-0 ms-auto">NT$ {{ $filters.currency(item.total) }}</p>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="cartNum === 0">
              <div class="text-center pb-5">
                <p class="px-3 mt-3 Sans-TC fs-5 accent-color">
                  您目前尚未選購產品
                </p>
                <router-link to="/products" class="btn btn-outline-custom Serif-TC col-6 col-md-auto mb-4">立即前往選購</router-link>
              </div>
            </template>
            <div class="px-3" v-if="cartNum !== 0">
              <div class="d-flex justify-content-between mt-4 mb-4 Sans-TC">
                <p class="mb-0 h4 fw-bold">總計</p>
                <p class="mb-0 h4 fw-bold">NT$ {{  $filters.currency(getCart.total) }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 bg-sec" style="padding-bottom: 12px;">
            <h2 class="text-center Serif-TC my-4">購物需知</h2>
            <div class="px-4">
              <p class="Sans-TC mb-2">
                提醒各位親愛的茶友們：
              </p>
              <p class="Sans-TC">
                為了保障您的權益，享受購物的過程，點擊詳閱下方說明事項，可以對我們的購物流程及付款方式有更清楚的認識喔。同時，請確認您填寫的聯繫信息正確無誤，以便我們能夠及時聯繫您，祝您購物愉快。
              </p>
            </div>
            <div class="accordion py-0 px-2 pb-2">
              <h5 class="accordion-header">
                <button
                type="button"
                class="accordion-button Sans-TC fs-6 collapsed"
                data-bs-toggle="collapse" data-bs-target="#collapseNotice" aria-expanded="true" aria-controls="collapseExample">
                  購物流程
                </button>
              </h5>
              <div class="collapse" id="collapseNotice">
                <div class="card card-body border-0 Sans-TC px-0">
                  <ol>
                    <li>選擇您感興趣的產品，加入購物車</li>
                    <li>確認購物車商品及數量</li>
                    <li>確認訂單內容</li>
                    <li>填寫資料</li>
                    <li>送出訂單</li>
                    <li>訂單成立</li>
                  </ol>
                </div>
              </div>
            </div>
            <div class="accordion py-0 px-2 pb-2">
              <h5 class="accordion-header">
                <button
                type="button"
                class="accordion-button Sans-TC fs-6 collapsed"
                data-bs-toggle="collapse" data-bs-target="#paymentMethod" aria-expanded="true" aria-controls="collapseExample">
                  付款方式
                </button>
              </h5>
              <div class="collapse" id="paymentMethod">
                <div class="card card-body border-0 Sans-TC px-0">
                  <ul>
                    <li>宅配貨到付款</li>
                    <li>銀行轉帳/ATM</li>
                    <li>信用卡</li>
                    <li>LINE Pay</li>
                    <li>超商貨到付款</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-between px-0 m-0" style="padding-top: 4vh;" v-if="cartNum !== 0">
            <router-link to="/products" class="btn btn-outline-n500 Serif-TC col-5 col-md-auto">繼續購物</router-link>
            <button type="button" class="btn btn-custom Serif-TC col-5 col-md-auto" style="padding-left: 1.5rem;" @click="checkCartNum">確認訂單</button>
          </div>
        </div>
      </div>
      <FrontFooter />
    </div>
  </div>
</template>

<!-- <script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'
import { Swal } from '@/methods/swalToast'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
export default {
  computed: {
    ...mapState(cartStore, ['getCart', 'cartNum', 'loadingItem'])
  },
  methods: {
    ...mapActions(cartStore, ['getCarts', 'plusCartQty', 'minusCartQty', 'updateCartItem', 'deleteCartItem', 'deleteCarts']),
    checkCartNum () {
      if (this.cartNum === 0) {
        Swal.fire({
          icon: 'error',
          title: '您目前尚未選購產品',
          confirmButtonColor: '#ab7e52'
        })
      } else {
        this.$router.push('/order')
      }
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
import { Swal } from '@/methods/swalToast'
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
import { useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'
const useCartStore = cartStore()
const getCart = computed(() => useCartStore.getCart)
const cartNum = computed(() => useCartStore.cartNum)
const loadingItem = computed(() => useCartStore.loadingItem)
const getCarts = () => {
  useCartStore.getCarts()
}
const plusCartQty = (item) => {
  useCartStore.plusCartQty(item)
}
const minusCartQty = (item) => {
  useCartStore.minusCartQty(item)
}
const updateCartItem = (item) => {
  useCartStore.updateCartItem(item)
}
const deleteCartItem = (item) => {
  useCartStore.deleteCartItem(item)
}
const deleteCarts = () => {
  useCartStore.deleteCarts()
}
const router = useRouter()
const checkCartNum = () => {
  if (cartNum.value === 0) {
    Swal.fire({
      icon: 'error',
      title: '您目前尚未選購產品',
      confirmButtonColor: '#ab7e52'
    })
  } else {
    router.push('/order')
  }
}
onMounted(() => {
  useCartStore.getCarts()
})
</script>