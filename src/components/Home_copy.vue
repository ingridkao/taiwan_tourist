<script>
import { defineComponent } from "vue"

import TaiwanMap from "/src/components/TaiwanMap.vue"
import HelloWorld from "/src/components/HelloWorld.vue"
import place_data from "/src/data/placeData.js"
import {GetTdxData} from "/src/assets/js/commom.js"

// import TaiwanSvgMap from '/src/assets/taiwan.svg'

export default defineComponent({
  name: "Home",
  data(){
    return {
      place_data,
      // TaiwanSvgMap,
      location: '',
      placeName: ''
    }
  },
  components: {
    HelloWorld,
    TaiwanMap
  },
  methods:{
    updateLocation(location){
      const answer = this.place_data.filter(item => item.tag === location)
      this.placeName = answer[0] && answer[0]['place'] ? answer[0]['place']: ''
      GetTdxData()
      // console.log(data.json());
    }
  }
})
</script>

<template>
  <div class="mapBox">
    <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
    <!-- {{place_data[1]}} -->
    {{placeName}}
    <TaiwanMap @update="updateLocation"/>
    <!-- <img :src="TaiwanSvgMap" :alt="AppTitle"> -->
  </div>
</template>

<style scoped>

</style>

