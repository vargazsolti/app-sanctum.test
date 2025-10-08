import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n, loadLocaleMessages } from './plugins/i18n'
import './assets/css/index.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)


const initial =
  localStorage.getItem('locale') ||
  (navigator.language?.slice(0, 2) || 'en')

loadLocaleMessages(initial)
  .catch((err) => {
    console.error('[i18n] Failed to load messages:', err)
    // fallback — legalább mountoljon az app
  })
  .finally(() => {
    app.mount('#app')
  })
