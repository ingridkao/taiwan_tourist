import { createRouter, createWebHistory } from "vue-router"
const routes = [
    {
      path: "/",
      name: "LandingPage",
      component: () => import("/src/components/LandingPage.vue")
    },
    {
      path: "/guide/:city",
      name: "Guide",
      component: () => import("/src/components/Guide.vue")
    },
    // {
    //   path: "/setting",
    //   name: "Setting",
    //   component: () => import("/src/components/Setting.vue")
    // }
]
export default createRouter({
    history: createWebHistory(),
    routes
})