import { createRouter, createWebHistory } from "vue-router"
const routes = [
    {
      path: "/",
      name: "Home",
      component: () => import("/src/components/Home.vue")
    },
    {
      path: "/setting",
      name: "Setting",
      component: () => import("/src/components/Setting.vue")
    }
]
export default createRouter({
    history: createWebHistory(),
    routes
})