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
    {
      path: "/touism/:type/:city",
      name: "Touism",
      component: () => import("/src/components/Touism.vue")
    },
    {
      path: "/information/:type/:city/:id",
      name: "Information",
      component: () => import("/src/components/Information.vue"),
    }
]
export default createRouter({
    history: createWebHistory(),
    routes
})