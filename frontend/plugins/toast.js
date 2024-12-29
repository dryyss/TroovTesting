import Vue from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

if (process.client) {
  Vue.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 3,
    newestOnTop: true,
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
  })
}
