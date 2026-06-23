import { Toast } from '@/methods/swalToast'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const loadFavoritesList = () => {
  const raw = localStorage.getItem('favoritesList')
  if (!raw) return []
  try { return JSON.parse(raw) || [] }
  catch { return [] }
}

const favoritesStore = defineStore('favoritesStore', () => {
  // state: () => {
  //   return {
  //     favoritesList: JSON.parse(localStorage.getItem('favoritesList')) || []
  //   }
  // },
  // actions: {
  //   toggleFavorite (product) {
  //     const favoriteIndex = this.favoritesList.findIndex((item) => item.id === product.id)
  //     if (favoriteIndex === -1) {
  //       this.favoritesList.push(product)
  //       Toast.fire({
  //         icon: 'success',
  //         title: '加到收藏'
  //       })
  //     } else {
  //       this.favoritesList.splice(favoriteIndex, 1)
  //       Toast.fire({
  //         icon: 'success',
  //         title: '取消收藏'
  //       })
  //     }
  //   },
  //   isFavorite (product) {
  //     return this.favoritesList.some((item) => item.id === product.id)
  //   }
  // },
  // getters: {
  //   getFavoritesNum: ({ favoritesList }) => {
  //     return favoritesList.length
  //   }
  // },
  // deep: ['favoritesList']
  const favoritesList = ref(loadFavoritesList())
  const toggleFavorite = (product) => {
    const favoriteIndex = favoritesList.value.findIndex((item) => item.id === product.id)
    if (favoriteIndex === -1) {
      favoritesList.value.push(product)
      Toast.fire({
        icon: 'success',
        title: '加到收藏'
      })
    } else {
      favoritesList.value.splice(favoriteIndex, 1)
      Toast.fire({
        icon: 'success',
        title: '取消收藏'
      })
    }
  }
  const isFavorite = (product) => {
    return favoritesList.value.some((item) => item.id === product.id)
  }
  const getFavoritesNum = computed(() => favoritesList.value.length)

  return {
    favoritesList,
    toggleFavorite,
    isFavorite,
    getFavoritesNum
  }
})
export default favoritesStore
