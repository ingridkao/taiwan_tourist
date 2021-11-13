
<script>
import { defineComponent } from 'vue'
import Logo from '/src/assets/img/logo.svg'
import citySelector from "/src/components/citySelector.vue"

export default defineComponent({
    data(){
        return {
            Logo
        }
    },
    components: {citySelector}
})
</script>

<template>
  <aside id="asidemenu">
    <header @click="$router.push('/')">
        <img :src="Logo" alt="Travel" class="small">
    </header>
    <citySelector/>
  </aside>

</template>
<style lang="scss" scoped>
#asidemenu{
    >header{
        text-align: left;
        padding: 1rem;
        cursor: pointer;
        img{
            width: 50%;
        }
    }
    >aside{
        margin: 0;
        padding: 0.5rem;
    }
}
</style>