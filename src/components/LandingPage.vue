<script>
import { defineComponent } from "vue"

import place_data from "/src/data/placeData.js"
import {GetTdxData} from "/src/assets/js/commom.js"

import Logo from '/src/assets/img/logo.svg'
import Illustration from '/src/assets/img/illustration.svg'

import CitySelector from "/src/components/CitySelector.vue"

export default defineComponent({
  name: "LandingPage",
  data(){
    return {
      Logo,
      Illustration,
      place_data,
      location: '',
      placeName: ''
    }
  },
  components: {CitySelector},
  methods:{
    updateLocation(location){
      const answer = this.place_data.filter(item => item.tag === location)
      this.placeName = answer[0] && answer[0]['place'] ? answer[0]['place']: ''
      GetTdxData()
    }
  }
})
</script>

<template>
  <div id="landingPage" class="container">
    <header>
      <div class="logo_box">
        <img :src="Logo" alt="Travel" class="big">
      </div>
    </header>
    <main>
      <CitySelector/>
      <div class="illustrationBox">
        <img :src="Illustration" alt="Illustration">
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container{
  max-width: 1680px;
  margin: auto;
  >*{
    padding: 1rem;
    display: flex;
  }
  main{
    flex-wrap: wrap;
    flex-direction: row;
    height: 30rem;
    >*{
      display: flex;
      justify-content: start;
      align-items: center;
      flex: 1;
    }
    .illustrationBox{
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: min-content;
      padding: 0 10%;
      img{
        width: 100%;
      }
    }
  }
}
@media only screen and (max-width: 640px) {
  .container{
    >*{
      padding: 0;
    }
    main{
      flex-direction: column-reverse;
      height: auto;
      .illustrationBox{
        width: 80%;
        margin: auto;
      }
    }
    #main_selector{
      max-width: none;
    }
  }
}

</style>

