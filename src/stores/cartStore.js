import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { Toast, Swal } from '@/methods/swalToast'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const cartStore = defineStore('cart', () => {
  // state: () => {
  //   return {
  //     cart: {},
  //     cartNum: 0,
  //     loadingItem: ''
  //   }
  // },
  // actions: {
  //   getCarts () {
  //     axios.get(`${VITE_APP_URL}api/${VITE_APP_PATH}/cart`)
  //       .then(res => {
  //         this.cart = res.data.data
  //         this.cartNum = res.data.data.carts.length
  //       })
  //       .catch(err => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: err.response.data.message,
  //           confirmButtonColor: '#ab7e52'
  //         })
  //       })
  //   },
  //   addToCart (id, tempQty) {
  //     if (tempQty) {
  //       const data = {
  //         product_id: id,
  //         qty: tempQty
  //       }
  //       this.loadingItem = id
  //       axios.post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data })
  //         .then(res => {
  //           Toast.fire({
  //             icon: 'success',
  //             title: res.data.message
  //           })
  //           this.getCarts()
  //           this.loadingItem = ''
  //         })
  //         .catch(err => {
  //           Swal.fire({
  //             icon: 'error',
  //             title: err.response.data.message,
  //             confirmButtonColor: '#ab7e52'
  //           })
  //         })
  //     } else {
  //       const data = {
  //         product_id: id,
  //         qty: 1
  //       }
  //       this.loadingItem = id
  //       axios.post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data })
  //         .then(res => {
  //           Toast.fire({
  //             icon: 'success',
  //             title: res.data.message
  //           })
  //           this.getCarts()
  //           this.loadingItem = ''
  //         })
  //         .catch(err => {
  //           Swal.fire({
  //             icon: 'error',
  //             title: err.response.data.message,
  //             confirmButtonColor: '#ab7e52'
  //           })
  //         })
  //     }
  //   },
  //   plusCartQty (item) {
  //     item.qty++
  //     this.updateCartItem(item)
  //   },
  //   minusCartQty (item) {
  //     if (item.qty > 1) {
  //       item.qty--
  //       this.updateCartItem(item)
  //     }
  //   },
  //   updateCartItem (item) {
  //     const data = {
  //       product_id: item.product.id,
  //       qty: item.qty
  //     }
  //     this.loadingItem = item.id
  //     axios.put(`${VITE_APP_URL}api/${VITE_APP_PATH}/cart/${item.id}`, { data })
  //       .then(res => {
  //         Toast.fire({
  //           icon: 'success',
  //           title: res.data.message
  //         })
  //         this.getCarts()
  //         this.loadingItem = ''
  //       })
  //       .catch(err => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: err.response.data.message,
  //           confirmButtonColor: '#ab7e52'
  //         })
  //       })
  //   },
  //   deleteCartItem (item) {
  //     this.loadingItem = item.id
  //     axios.delete(`${VITE_APP_URL}api/${VITE_APP_PATH}/cart/${item.id}`)
  //       .then(res => {
  //         Toast.fire({
  //           icon: 'success',
  //           title: res.data.message
  //         })
  //         this.getCarts()
  //         this.loadingItem = ''
  //       })
  //       .catch(err => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: err.response.data.message,
  //           confirmButtonColor: '#ab7e52'
  //         })
  //       })
  //   },
  //   deleteCarts () {
  //     if (this.cartNum !== 0) {
  //       axios.delete(`${VITE_APP_URL}api/${VITE_APP_PATH}/carts`)
  //         .then(res => {
  //           Toast.fire({
  //             icon: 'success',
  //             title: res.data.message
  //           })
  //           this.getCarts()
  //         })
  //         .catch(err => {
  //           Swal.fire({
  //             icon: 'error',
  //             title: err.response.data.message,
  //             confirmButtonColor: '#ab7e52'
  //           })
  //         })
  //     } else {
  //       Toast.fire({
  //         icon: 'warning',
  //         title: '您尚未選購產品'
  //       })
  //     }
  //   }
  // },
  // getters: {
  //   getCart: ({ cart }) => {
  //     return cart
  //   }
  // }
  const cart = ref({})
  const cartNum = ref(0)
  const loadingItem = ref('')

  const getCarts = () => {
    axios.get(`${VITE_APP_URL}api/${VITE_APP_PATH}/cart`)
      .then(res => {
        cart.value = res.data.data
        cartNum.value = res.data.data.carts.length
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
          confirmButtonColor: '#ab7e52'
        })
      })
  }
  const addToCart = (id, tempQty) => {
    const data = {
      product_id: id,
      qty: tempQty || 1
    }
    loadingItem.value = id
    axios.post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data })
      .then(res => {
        Toast.fire({
          icon: 'success',
          title: res.data.message
        })
        getCarts()
        loadingItem.value = ''
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
          confirmButtonColor: '#ab7e52'
        })
      })
  }
  const plusCartQty = (item) => {
    item.qty++
    updateCartItem(item)
  }
  const minusCartQty = (item) => {
    if (item.qty > 1) {
      item.qty--
      updateCartItem(item)
    }
  }
  const updateCartItem = (item) => {
    const data = {
      product_id: item.product.id,
      qty: item.qty
    }
    loadingItem.value = item.id
    axios.put(`${VITE_APP_URL}api/${VITE_APP_PATH}/cart/${item.id}`, { data })
      .then(res => {
        Toast.fire({
          icon: 'success',
          title: res.data.message
        })
        getCarts()
        loadingItem.value = ''
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
          confirmButtonColor: '#ab7e52'
        })
      })
  }
  const deleteCartItem = (item) => {
    loadingItem.value = item.id
    axios.delete(`${VITE_APP_URL}api/${VITE_APP_PATH}/cart/${item.id}`)
      .then(res => {
        Toast.fire({
          icon: 'success',
          title: res.data.message
        })
        getCarts()
        loadingItem.value = ''
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
          confirmButtonColor: '#ab7e52'
        })
      })
  }
  const deleteCarts = () => {
    if (cartNum.value !== 0) {
      axios.delete(`${VITE_APP_URL}api/${VITE_APP_PATH}/carts`)
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          getCarts()
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    } else {
      Toast.fire({
        icon: 'warning',
        title: '您尚未選購產品'
      })
    }
  }
  const getCart = computed(() => cart.value)

  return {
    cart,
    cartNum,
    loadingItem,
    getCarts,
    addToCart,
    plusCartQty,
    minusCartQty,
    updateCartItem,
    deleteCartItem,
    deleteCarts,
    getCart
  }
})
export default cartStore
