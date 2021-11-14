
<script>
import { defineComponent } from 'vue'
import { mapState } from "vuex"

import Logo from '/src/assets/img/logo.svg'
import LogoMini from '/src/assets/img/logo_mini.svg'
import toggle from '/src/assets/img/toggle.svg'

import CitySelector from "/src/components/CitySelector.vue"

export default defineComponent({
    data(){
        return {
            Logo,LogoMini,toggle
        }
    },
    components: {CitySelector},
    computed:{
        ...mapState(["fullPage","navToggle"]),
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

<template>
  <aside id="asidemenu" v-if="!landingPage" :class="{open : fullPage || navToggle}">
    <header>
        <button v-if="!fullPage" @click="toggleBtn">
            <img :src="toggle" alt="toggle">
        </button>
        <button @click="$router.push('/')" class="logo_btn">
            <img :src="Logo" alt="Travel">
        </button>
        <div></div>
    </header>
    <CitySelector/>
  </aside>

</template>
<style lang="scss" scoped>
#asidemenu{
    height: 100vh;
    >header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 3rem;
        .logo_btn{
            height: 100%;
            img{
                height: 100%;
            }
        }
        >div{
            width: 2rem;
        }
    }
    >aside{
        padding: 0.5rem;
    }
}
</style>