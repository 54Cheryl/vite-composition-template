import Modal from 'bootstrap/js/dist/modal'
import { onMounted } from 'vue'

export default function useModal (modalRef) {
  let modalInstance = null

  onMounted(() => {
    if (!modalRef.value) return

    modalInstance = new Modal(modalRef.value, {
      backdrop: 'static',
      keyboard: false
    })

    modalRef.value.addEventListener('hide.bs.modal', () => {
      const activeElement = document.activeElement
      if (activeElement instanceof HTMLElement && modalRef.value.contains(activeElement)) {
        activeElement.blur()
      }
    })
  })

  const showModal = () => {
    modalInstance?.show()
  }

  const hideModal = () => {
    modalInstance?.hide()
  }

  return {
    showModal,
    hideModal
  }
}
