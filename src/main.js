import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'

// Bootstrap CSS + JS (solo bundle)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Íconos y librerías adicionales
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'

createApp(App).use(router).mount('#app')
