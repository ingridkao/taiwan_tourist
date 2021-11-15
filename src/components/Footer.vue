<script>
import { defineComponent } from "vue"
import TaiwanMap from "/src/components/TaiwanMap.vue"
import place_data from "/src/data/placeData.js"

export default defineComponent({
  data(){
    return {
      TaiwanMap,
      hoverCity: ''
    }
  },
  components: { TaiwanMap },
  computed:{
    landingPage(){
      return this.$route && this.$route.name === 'LandingPage'
    }
  },
  methods:{
    updateLocation(location){
      const answer = place_data.find(item => item.tag === location)
      if(answer && answer.index){
        this.$router.push({ 
          name: 'Guide', 
          params: { 
            city: answer.index
          }
        })
      }
    },
    hoverCityInfo(target){
      const answer = place_data.find(item => item.tag === target)
      this.hoverCity = (answer && answer.place)? answer.place: ''
    }
  }
})
</script>
<template >
<footer id="pageFooter" v-if="!landingPage">
  <div class="minimap">
    <TaiwanMap @info="hoverCityInfo" @update="updateLocation"/>
  </div>
  <div class="alignMiddle">
    <p>UI Design： <a href="https://www.figma.com/file/fnHynjl6HHHCcqay2C4KVn" target="_blank"> jhen </a></p>
    <p>Front-end： <a href="https://github.com/ingridkao" target="_blank"> Ingrid Kao </a></p>
    <p>API Source： <a href="https://tdx.transportdata.tw/api-service/swagger" target="_blank"> 交通部PTX服務平臺 </a></p>
    <p>Repositories： <a href="https://github.com/ingridkao/taiwan_tourist" target="_blank"> GitHub </a></p>
    <br>
    <p class="minimap">點選<b>{{hoverCity? hoverCity: '該縣市'}}</b>進入City Guide頁面</p>
  </div>
</footer>
</template>

<style scoped lang="scss">
footer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  height: 20rem;
  >div{
    height: 100%;
  }
  b{
    margin: 0 .25rem;
  }
}
@media only screen and (max-width: 640px) {
  footer{
    height: auto;
    justify-content: flex-start;
    .minimap{
      display: none;
    }
  }
}
</style>
