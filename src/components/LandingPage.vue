<script>
import { defineComponent } from "vue"

import place_data from "/src/data/placeData.js"
import {GetTdxData} from "/src/assets/js/commom.js"

import Logo from '/src/assets/img/logo.svg'
import LogoMini from '/src/assets/img/logo_mini.svg'
import Illustration from '/src/assets/img/illustration.svg'

import citySelector from "/src/components/citySelector.vue"

export default defineComponent({
  name: "LandingPage",
  data(){
    return {
      Logo,
      LogoMini,
      Illustration,
      place_data,
      location: '',
      placeName: ''
    }
  },
  components: {citySelector},
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
        <img :src="LogoMini" alt="Travel" class="small">
      </div>
    </header>
    <main>
      <citySelector/>
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
    >aside{
      flex: 0 0 14rem;
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
.logo_box{
  height: 5rem;
  img{
    height: 100%;
    &.big{
      display: block;
    }
    &.small{
      display: none;
    }
  }
}
@media only screen and (max-width: 640px) {
  .container{
    main{
      flex-direction: column-reverse;
      height: auto;
      .illustrationBox{
        width: 60%;
        margin: auto;
      }
    }
  }
  .logo_box{
    height: 3rem;
    img{
      &.big{
        display: none;
      }
      &.small{
        display: block;
      }
    }
  }
}

</style>

