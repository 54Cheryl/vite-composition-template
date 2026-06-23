<template>
  <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增優惠券</span>
            <span v-else>編輯優惠券</span>
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm v-slot="{ errors }">
            <div class="col">
              <label class="form-label mt-2" for="title">優惠券名稱</label>
              <VField
                id="title"
                name="名稱"
                type="text"
                class="form-control"
                placeholder="請輸入名稱"
                :class="{ 'is-invalid': errors['名稱'] }"
                rules="required"
                v-model="tempCoupon.title"
              ></VField>
              <ErrorMessage name="名稱" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="col">
              <label class="form-label mt-2" for="coupon_code">優惠代碼</label>
              <VField
                id="coupon_code"
                name="代碼"
                type="text"
                class="form-control"
                placeholder="請輸入代碼"
                :class="{ 'is-invalid': errors['代碼'] }"
                rules="required"
                v-model="tempCoupon.code"
              ></VField>
              <ErrorMessage name="代碼" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="col">
              <label class="form-label mt-2" for="due_date">到期日</label>
              <VField
                id="due_date"
                name="到期日"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': errors['到期日'] }"
                rules="required"
                v-model="due_date"
                :min="due_date"
              ></VField>
              <ErrorMessage name="到期日" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="col">
              <label class="form-label mt-2" for="percent">折扣百分比</label>
              <VField
                id="percent"
                name="百分比"
                type="number"
                min="0"
                max="100"
                class="form-control"
                placeholder="請輸入折扣百分比"
                :class="{ 'is-invalid': errors['百分比'] }"
                rules="required"
                v-model.number="tempCoupon.percent"
              ></VField>
              <ErrorMessage name="百分比" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="col my-3">
              <input
                id="is_enabled"
                name="是否啟用"
                type="checkbox"
                class="form-check-input"
                v-model="tempCoupon.is_enabled"
                :true-value="1"
                :false-value="0"
              >
              <label class="form-label ms-2" for="is_enabled">是否啟用</label>
            </div>
          </VForm>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-n500" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-custom" style="padding-left: 1.5rem;" @click="() => $emit('update-coupon')">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    coupon: {},
    isNew: {}
  },
  data () {
    return {
      tempCoupon: {},
      modal: '',
      due_date: ''
    }
  },
  watch: {
    coupon () {
      this.tempCoupon = this.coupon
      if (this.tempCoupon.due_date) {
        const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T', 1)[0]
        this.due_date = dateAndTime
      }
    },
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  mixins: [modalMixin],
  emits: ['update-coupon']
}
</script> -->
<script setup>
import { ref, watch } from 'vue'
import useModal from '@/mixins/modalMixin'

const props = defineProps({
  coupon: Object,
  isNew: Boolean
})
const emit = defineEmits(['update-coupon'])

const tempCoupon = ref({})
const modal = ref(null)
const due_date = ref('')
const { showModal, hideModal } = useModal(modal)

defineExpose({ showModal, hideModal })

watch(
  () => props.coupon,
  (value) => {
    tempCoupon.value = value
    if (tempCoupon.value?.due_date) {
      const dateAndTime = new Date(tempCoupon.value.due_date * 1000).toISOString().split('T', 1)[0]
      due_date.value = dateAndTime
    }
  },
  { immediate: true }
)

watch(due_date, (value) => {
  tempCoupon.value.due_date = Math.floor(new Date(value) / 1000)
})

const confirmUpdate = () => {
  emit('update-coupon')
}
</script>