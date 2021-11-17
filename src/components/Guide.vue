<script>
import {defineComponent } from 'vue'
import { mapState } from "vuex"

import {GetTdxMultData} from "/src/assets/js/commom.js"
import {citiy, apiType} from "/src/assets/js/commom.js"

import Illustration from '/src/assets/img/illustration.svg'
import Time from '/src/assets/img/Time.svg'
import share from '/src/assets/img/share.svg'
import loction from '/src/assets/img/Location.svg'
import loction_g from '/src/assets/img/Location_g.svg'
import calling from '/src/assets/img/Calling.svg'
import LogoMini from '/src/assets/img/logo_mini.svg'

import PageHeader from "/src/components/PageHeader.vue"
import Footer from "/src/components/Footer.vue"
import Cards from "/src/components/Cards.vue"

export default defineComponent({
  data(){
    return {
      currentCity : null,
      mainData: [],
      citiy,
      apiType,
      Illustration,Time,share,loction, loction_g, calling, LogoMini
    }
  },
  created(){
    if(this.$route.params && this.$route.params.city){
      this.currentCity = this.$route.params.city
    }
  },
  mounted() {
    this.fetchData()
  },
  computed:{
    ...mapState(["searchtext", "navToggle", "fullPage"])
  },
  watch: {
    $route(to, from) {
      if(to.name != from.name && to.params && to.params.city){
        this.currentCity = to.params.city
        this.fetchData()
      }
    },
    'searchtext'(){
      this.fetchData()
    }
  },
  components: {PageHeader, Footer, Cards},
  methods: {
    fetchData(){
      if(this.currentCity){
        const check = Object.keys(citiy).find(item => item === this.currentCity)
        if(check){
          this.mainData = []
          const requestArray = []
          const params = {'$top': 3}
          if(this.searchtext){
              params['$filter'] = `contains(Name,'${this.searchtext}')`
          }
          apiType.map(item => {
            requestArray.push({
              url: `${item.url}/${this.currentCity}`, 
              params
            })
          })
          GetTdxMultData(requestArray).then(res=>{
            this.mainData = res
          }).catch(error => {
              console.log(error);
          })
        }else{
          this.$router.push('/')
        }
      }else{
         this.$router.push('/')
      }
    },
    routeToPage3(target){
      this.$router.push({ 
        name: 'Touism', 
        params: { 
          type: target,
          city: this.currentCity,
        }
      })
    },
    routeToPage4(cardItem){
      this.$store.commit("setInformationObj", cardItem)
      this.$router.push({ 
        name: 'Information', 
        params:{
          type: target,
          city: this.currentCity,
          id: cardItem.ID
        }
      })
    },
    getCity(target, index){
      return apiType[target]? apiType[target][index]: ''
    }
  }
})
</script>

<template>
<main class="main_container" :class="{fullPage}">
  <PageHeader/>
  <div id="guidePage" class="page_container" :class="{hasHeader: !navToggle, fullPage}">
    <header>
      <div>
        <h3>探索。</h3>
        <h3>{{citiy[currentCity]}}</h3>
      </div>
      <img :src="Illustration" alt="Illustration">
    </header>

    <div v-for="(dataItem, dataIndex) in mainData" :key="dataIndex">
      <div class="mainData_container" v-if="dataItem.length>0">
        <h4 class="titleBox">
          <div class="iconText">
            <img :src="loction">
            <span>{{getCity(dataIndex, 'title')}}</span>
          </div>
          <button class="textBtn" @click="routeToPage3(getCity(dataIndex, 'index'))">更多{{getCity(dataIndex,'name')}}推薦</button>
        </h4>
        <div class="card_container" v-if="dataItem.length > 0" :class="{more: dataItem.length > 2}">
          <Cards v-for="(cardItem, cardIndex) in dataItem" :key="dataIndex + '' + cardIndex" :cardItem="cardItem" :currentType="getCity(dataIndex, 'index')"/>
        </div>
        <div v-else>Nodata</div>
      </div>
    </div>
  </div>
  <Footer/>
</main>
</template>

<style lang="scss" scoped>
$shadow: 0px 14px 24px rgba(0, 0, 0, 0.04);
#guidePage{
  header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 14rem;
    box-shadow: $shadow;
    background: #fff;
    border-radius: 16px;
    margin-bottom: 1rem;
    padding: 1rem 1rem 0 1rem;
    overflow: hidden;
    >div{
      flex: 0 0 6rem;
    }
    >img{
      height: 100%;
    }
  }
}

.mainData_container{
  .titleBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

@media only screen and (max-width: 640px) {}

</style>