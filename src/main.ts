import { createApp } from 'vue'
import Markdown from 'vue3-markdown-it'

import './style.css'
import App from './App.vue'
const app = createApp(App)
app.component('Markdown', Markdown)
app.mount('#app')
