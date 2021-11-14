<script>
import {defineComponent } from 'vue'
import { mapState } from "vuex"

import AsideMenu from './components/AsideMenu.vue'
import PageHeader from './components/PageHeader.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
  created(){
    window.addEventListener("resize", this.detectWindowWidth);
  },
  destroyed(){
    window.removeEventListener("resize", this.detectWindowWidth);
  },
  components: {AsideMenu, PageHeader, Footer},
  computed:{
    ...mapState(["fullPage"])
  },

  methods: {
    detectWindowWidth(){
      this.$store.commit("detectWidth", window.innerWidth)
    }
  }
})
</script>

<template>
  <AsideMenu/>
  <main id="main_container" :class="{fullPage}">
    <PageHeader/>
    <router-view />
    <Footer/>
  </main>
</template>