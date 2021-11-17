<script>
import { defineComponent } from "vue"
import { mapState } from "vuex"

import Logo from '/src/assets/img/logo.svg'
import toggle from '/src/assets/img/toggle.svg'

export default defineComponent({
  data(){
    return {
      Logo, toggle
    }
  },
  computed:{
    ...mapState(["fullPage", "navToggle"]),
    landingPage(){
      return this.$route && this.$route.name === 'LandingPage'
    }
  },
  methods:{
    toggleBtn(){
      this.$store.commit("setNavToggle")
    }
  }
})
</script>
<template >
<header v-if="!landingPage" id="pageHeader" :class="{open: !navToggle, fullPage}">  
  <button @click="toggleBtn">
    <img :src="toggle" alt="toggle" >
  </button>
  <button @click="this.$router.push('/')">
    <img :src="Logo" alt="Travel" >
  </button>
  <div></div>
</header>
</template>

