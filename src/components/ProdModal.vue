<template>
  <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm v-slot="{ errors }" class="row">
            <div class="col-4">
              <div class="col">
                <label class="form-label mt-2" for="prodMainImg">主要圖片</label>
                <input
                  id="prodMainImg"
                  name="主要圖片"
                  type="text"
                  class="form-control mb-2"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                >
                <img :src="tempProduct.imageUrl" alt="產品主要圖片" class="img-fluid">
              </div>
              <p class="fs-4 mt-2">多圖新增</p>
              <template v-if="Array.isArray(tempProduct.imagesUrl)">
                <div class="mb-1" v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                  <div class="mb-3">
                    <label for="prodOtherImg" class="form-label">圖片網址</label>
                    <input v-model="tempProduct.imagesUrl[key]" type="text" class="form-control" id="prodOtherImg"
                      placeholder="請輸入圖片連結">
                  </div>
                  <img class="img-fluid" :src="image" alt="產品相關圖片">
                </div>
                <div v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                  <button type="button" class="btn btn-outline-main btn-sm d-block w-100"
                    @click="() => tempProduct.imagesUrl.push('')">
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button type="button" class="btn btn-outline-accent btn-sm d-block w-100" style="padding: 0.25rem 0.5rem;" @click="() => tempProduct.imagesUrl.pop()">
                    刪除圖片
                  </button>
                </div>
              </template>
              <div v-else>
                <button type="button" class="btn btn-outline-primary btn-sm d-block w-100" @click="() => $emit('create-images')">
                  新增圖片
                </button>
              </div>
              <div class="col mt-5">
                <label for="customFile" class="fs-4 form-label"
                  >上傳圖檔
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="imgUploading"
                  ></i>
                </label>
                <input
                type="file"
                name="file-to-upload"
                id="customFile"
                class="form-control mb-2"
                ref="fileInput"
                @change="uploadFile"
                />
                <label for="fileLink" class="form-label mt-2">檔案生成網址</label>
                <input type="text" class="form-control mb-2" id="fileLink" placeholder="請複製用於上方圖片連結" v-model="tempProduct.tempImage">
              </div>
            </div>
            <div class="col-8">
              <div class="row">
                <div class="col-6">
                  <label class="form-label mt-2" for="prodTitle">品名</label>
                  <VField
                  id="prodTitle"
                  name="品名"
                  type="text"
                  class="form-control"
                  placeholder="請輸入品名"
                  :class="{ 'is-invalid': errors['品名'] }"
                  rules="required"
                  v-model="tempProduct.title"
                  ></VField>
                  <ErrorMessage name="品名" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <label class="form-label mt-2" for="prodCategory">類別</label>
                  <VField
                    id="prodCategory"
                    name="類別"
                    type="text"
                    class="form-control"
                    placeholder="請輸入類別"
                    :class="{ 'is-invalid': errors['類別'] }"
                    rules="required"
                    v-model="tempProduct.category"
                  ></VField>
                  <ErrorMessage name="類別" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label class="form-label mt-2" for="prodPlace">產地</label>
                  <VField
                    id="prodPlace"
                    name="產地"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產地"
                    :class="{ 'is-invalid': errors['產地'] }"
                    rules="required"
                    v-model="tempProduct.origin_place"
                  ></VField>
                  <ErrorMessage name="產地" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <label class="form-label mt-2" for="prodVariety">品種</label>
                  <VField
                    id="prodVariety"
                    name="品種"
                    type="text"
                    class="form-control"
                    placeholder="請輸入品種"
                    :class="{ 'is-invalid': errors['品種'] }"
                    rules="required"
                    v-model="tempProduct.variety"
                  ></VField>
                  <ErrorMessage name="品種" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label class="form-label mt-2" for="prodAroma">香氣</label>
                  <VField
                    id="prodAroma"
                    name="香氣"
                    type="text"
                    class="form-control"
                    placeholder="請輸入香氣"
                    :class="{ 'is-invalid': errors['香氣'] }"
                    rules="required"
                    v-model="tempProduct.aroma"
                  ></VField>
                  <ErrorMessage name="香氣" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <label class="form-label mt-2" for="prodTaste">滋味</label>
                  <VField
                    id="prodTaste"
                    name="滋味"
                    type="text"
                    class="form-control"
                    placeholder="請輸入滋味"
                    :class="{ 'is-invalid': errors['滋味'] }"
                    rules="required"
                    v-model="tempProduct.taste"
                  ></VField>
                  <ErrorMessage name="滋味" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label class="form-label mt-2" for="prodDried">茶乾</label>
                  <VField
                    id="prodDried"
                    name="茶乾"
                    type="text"
                    class="form-control"
                    placeholder="請輸入茶乾"
                    :class="{ 'is-invalid': errors['滋味'] }"
                    rules="required"
                    v-model="tempProduct.tea_dried"
                  ></VField>
                  <ErrorMessage name="茶乾" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <label class="form-label mt-2" for="prodUnit">單位</label>
                  <VField
                    id="prodUnit"
                    name="單位"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    :class="{ 'is-invalid': errors['單位'] }"
                    rules="required"
                    v-model="tempProduct.unit"
                  ></VField>
                  <ErrorMessage name="單位" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label class="form-label mt-2" for="prodOrigin">原價</label>
                  <VField
                    id="prodOrigin"
                    name="原價"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    :class="{ 'is-invalid': errors['原價'] }"
                    rules="required"
                    v-model.number="tempProduct.origin_price"
                  ></VField>
                  <ErrorMessage name="原價" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <label class="form-label mt-2" for="prodPrice">售價</label>
                  <VField
                    id="prodPrice"
                    name="售價"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    :class="{ 'is-invalid': errors['售價'] }"
                    rules="required"
                    v-model.number="tempProduct.price"
                  ></VField>
                  <ErrorMessage name="售價" class="invalid-feedback"></ErrorMessage>
                </div>
              </div>
              <label class="form-label mt-2" for="prodDescription">產品描述</label>
              <VField
                as="textarea"
                id="prodDescription"
                name="描述"
                class="form-control"
                cols="30"
                rows="2"
                placeholder="請輸入產品描述"
                :class="{ 'is-invalid': errors['描述'] }"
                rules="required"
                v-model="tempProduct.description"
              ></VField>
              <ErrorMessage name="描述" class="invalid-feedback"></ErrorMessage>
              <label class="form-label mt-2" for="prodContent">說明內容</label>
              <VField
                as="textarea"
                id="prodContent"
                name="說明"
                class="form-control"
                cols="30"
                rows="2"
                placeholder="請輸入說明內容"
                :class="{ 'is-invalid': errors['說明'] }"
                rules="required"
                v-model="tempProduct.content"
              ></VField>
              <ErrorMessage name="說明" class="invalid-feedback"></ErrorMessage>
              <div class="col mt-2">
                <input type="checkbox" class="form-check-input" id="prodEnabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                <label class="form-label ms-2" for="prodEnabled">是否啟用</label>
              </div>
            </div>
          </VForm>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-n500" data-bs-dismiss="modal" @click="() => $emit('cancel-product')">取消</button>
          <button type="button" class="btn btn-custom" style="padding-left: 1.5rem;" @click="() => $emit('update-product')">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import modalMixin from '@/mixins/modalMixin'
import { Toast, Swal } from '@/methods/swalToast'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  props: {
    product: {},
    isNew: {}
  },
  data () {
    return {
      tempProduct: {},
      modal: '',
      imgUploading: false
    }
  },
  mixins: [modalMixin],
  emits: ['update-product', 'cancel-product', 'create-images'],
  watch: {
    product () {
      this.tempProduct = this.product
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = []
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = ''
      }
    }
  },
  methods: {
    uploadFile () {
      this.imgUploading = true
      const file = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      this.$http.post(`${VITE_APP_URL}api/${VITE_APP_PATH}/admin/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          if (res.data.success) {
            this.tempProduct.tempImage = res.data.imageUrl
            this.$refs.fileInput.value = ''
            this.imgUploading = false
            Toast.fire({
              icon: 'success',
              title: '上傳成功',
              text: res.data.message
            })
          } else {
            this.$refs.fileInput.value = ''
            this.imgUploading = false
            Toast.fire({
              icon: 'error',
              title: '上傳失敗',
              text: res.data.message
            })
          }
        })
        .catch((err) => {
          this.imgUploading = false
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            confirmButtonColor: '#ab7e52'
          })
        })
    }
  }
}
</script> -->
<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import useModal from '@/mixins/modalMixin'
import { Toast, Swal } from '@/methods/swalToast'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const props = defineProps({
  product: Object,
  isNew: Boolean
})
const emit = defineEmits(['update-product', 'cancel-product', 'create-images'])
const tempProduct = ref({})
const modal = ref(null)
const fileInput = ref(null)
const imgUploading = ref(false)
const { showModal, hideModal } = useModal(modal)
defineExpose({ showModal, hideModal })
watch(
  () => props.product,
  (value) => {
    tempProduct.value = value
    if (!tempProduct.value.imagesUrl) {
      tempProduct.value.imagesUrl = []
    }
    if (!tempProduct.value.imageUrl) {
      tempProduct.value.imageUrl = ''
    }
  },
  { immediate: true }
)
const uploadFile = () => {
  imgUploading.value = true
  const file = fileInput.value.files[0]
  const formData = new FormData()
  formData.append('file-to-upload', file)
  axios.post(`${VITE_APP_URL}api/${VITE_APP_PATH}/admin/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((res) => {
      if (res.data.success) {
        tempProduct.value.tempImage = res.data.imageUrl
        fileInput.value.value = ''
        imgUploading.value = false
        Toast.fire({
          icon: 'success',
          title: '上傳成功',
          text: res.data.message
        })
      } else {
        fileInput.value.value = ''
        imgUploading.value = false
        Toast.fire({
          icon: 'error',
          title: '上傳失敗',
          text: res.data.message
        })
      }
    })
    .catch((err) => {
      imgUploading.value = false
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
        confirmButtonColor: '#ab7e52'
      })
    })
}
</script>