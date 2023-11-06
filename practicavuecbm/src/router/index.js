import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistasView from '../views/ArtistasView.vue'
import DiscosView from '../views/DiscosView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/artistas',
    name: 'artistas',
    component: () => import(/* webpackChunkName: "artistas" */ '../views/ArtistasView.vue')
  },
  {
    path: '/discos',
    name: 'discos',
    component: () => import(/* webpackChunkName: "discos" */ '../views/DiscosView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
