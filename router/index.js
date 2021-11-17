import { createRouter, createWebHistory } from "vue-router"
export const baseURL = process.env.NODE_ENV === 'production'? '/taiwan_tourist/': '/'

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
    },
    //失效不知道為什麼
    // {
      // path: "*",
    //   redirect:'/'
    // }
]

export default createRouter({
  history: createWebHistory(baseURL),
  routes
})