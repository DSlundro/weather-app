import Vue from 'vue'
import VueRouter from 'vue-router'
import AddCity from '../views/AddCity.vue'
import WeatherInfo from '../views/WeatherInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AddCity',
    component: AddCity
  },
  {
    path: '/weather/:city',
    name: 'WeatherInfo',
    component: WeatherInfo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
