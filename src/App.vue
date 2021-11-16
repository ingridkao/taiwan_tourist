<script>
import {defineComponent } from 'vue'
import AsideMenu from './components/AsideMenu.vue'

export default defineComponent({
  created(){
    window.addEventListener("resize", this.detectWindowWidth);
  },
  destroyed(){
    window.removeEventListener("resize", this.detectWindowWidth);
  },
  components: {AsideMenu},
  methods: {
    detectWindowWidth(){
      this.$store.commit("detectWidth", window.innerWidth)
    }
  }
})
</script>

<template>
  <div id="appPage" v-cloak>
    <AsideMenu/>
    <router-view/>
  </div>
</template>
<style>
[v-cloak]{
  display: none;
}
</style>