import "@/assets/main.css";
import 'v-calendar/style.css';

import { createApp } from 'vue';
import App from './App.vue'


import VCalendar from 'v-calendar';
import { store } from "./Store";
import moment from 'moment'


const app = createApp(App)
app.use(VCalendar,{})
app.use(moment)
app.use(store)
app.mount('#app')
