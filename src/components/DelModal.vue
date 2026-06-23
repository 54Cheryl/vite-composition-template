<template>
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="exampleModalLabel" v-if="tempData.title">刪除{{ tempData.title }}</h5>
          <h5 class="modal-title" id="exampleModalLabel" v-else>刪除訂單</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除<span class="text-danger fw-bold">{{ tempData.title }}</span> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-n500" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-accent" @click="() => $emit('del-data')">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useModal from '@/mixins/modalMixin'

const props = defineProps({
  tempData: Object
})
const emit = defineEmits(['del-data'])

const modal = ref(null)
const { showModal, hideModal } = useModal(modal)

defineExpose({ showModal, hideModal })
</script>
