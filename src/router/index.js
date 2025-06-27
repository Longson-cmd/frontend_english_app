import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import WordDetailPage from '../views/WordDetailPage.vue'
import NewWords from '../views/NewWords.vue'
import SelfIntroduction from '../views/SelfIntroduction.vue'
import signup from '../views/signup.vue'
import login from '../views/login.vue'

const routes = [
  {path: '/', redirect: "/login"},
  {path: "/login", name : "Login", component: login},
  {path: "/signup", name: "Signup", component: signup},
  { path: '/home', name: 'HomePage', component: HomePage },
  { path: '/NewWords', name: 'NewWords', component: NewWords },
  { path: '/word/:key', name: 'WordDetailPage', component: WordDetailPage },
  { path: '/self_introduction', name: 'self_introduction', component: SelfIntroduction  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
