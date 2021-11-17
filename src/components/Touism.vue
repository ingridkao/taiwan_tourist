<script>
import {defineComponent } from 'vue'
import { mapState } from "vuex"

import {GetTdxData} from "/src/assets/js/commom.js"
import {citiy, apiType} from "/src/assets/js/commom.js"

import ArrowLeft from '/src/assets/img/ArrowLeft.svg'
import Loading from '/src/assets/img/loading.svg'

import PageHeader from "/src/components/PageHeader.vue"
import Footer from "/src/components/Footer.vue"
import Cards from "/src/components/Cards.vue"

export default defineComponent({
  data(){
    return {
      ArrowLeft,
      Loading,
      currentCity : null,
      currentType : null,
      mainData: [],
      dataCount: 0,
      limit: 9,
      currentPage: 1,
      processData: [],
      apiLoad: true
    }
  },
  mounted() {
    this.checkParams(this.$route.params)
  },
  watch: {
    $route(to, from) {
      if(to.params && to.params.city != from.params.city){
        this.checkParams(to.params)
      }
    },
    searchtext(){
      this.fetchData()
    }
  },
  components: {PageHeader, Footer, Cards},
  computed: {
    ...mapState(["searchtext", "navToggle", "fullPage"]),
    pageCount(){
      return parseInt(this.dataCount/this.limit) + (this.dataCount%this.limit > 0? 1: 0)
    },
    cityTitle(){
      return this.currentCity? citiy[this.currentCity]: ''
    },
    apiTypeTitle(){
      if(!this.currentType)return null
      const checkType = apiType.find(item => item.index === this.currentType)
      return checkType.title
    }
  },
  methods: {
    checkParams(paramsObj){
      if(paramsObj){
        this.currentCity = paramsObj.city
        this.currentType = paramsObj.type
        this.fetchData()
      }else{
        this.$router.push('/')
      }
    },
    fetchData(){
      if(this.currentType){
        const checkType = apiType.find(item => item.index === this.currentType)
        if(checkType){
          this.mainData = []
          this.dataCount = 0
          const params = {}
          if(this.searchtext){
              params['$filter'] = `contains(Name,'${this.searchtext}')`
          }
          this.apiLoad = true
          GetTdxData(`${checkType.url}${this.currentCity? '/' + this.currentCity: ''}`,params).then(res=>{
            this.mainData = res
            this.dataCount = res.length
            this.setPageData()
          }).catch(error => {
              console.log(error);
          })
        }
      }else{
        this.$router.push('/')
      }
    },
    setPageData(){
      const start = (this.currentPage - 1)*this.limit
      this.processData = this.mainData.slice(start, start + this.limit)
      this.apiLoad = false
    },
    changePage(page){
      this.currentPage = page
      this.setPageData()
    },
    goBack(){
      this.$router.push({ 
        name: 'Guide', 
        params: { 
          city: this.currentCity
        }
      })
    }
  }
})

</script>

<template>
<main class="main_container" :class="{fullPage}">
  <PageHeader/>
  <div id="touismPage" class="page_container" :class="{hasHeader: !navToggle, fullPage}">
    <h4 class="iconText">
      <button @click="goBack"><img :src="ArrowLeft" alt="回上一頁"></button>
      <span>
        {{currentCity? cityTitle: apiTypeTitle}}
      </span>
    </h4>
    <div class="mainData_container">
      <div v-if="apiLoad" class="loadingBox">
        <img :src="Loading" alt="Loading...">
      </div>
      <div class="card_container touism" v-if="!apiLoad && mainData.length > 0">
        <Cards v-for="(cardItem, cardIndex) in processData" :key="cardIndex" :cardItem="cardItem" :currentType="currentType"/>
        <div class="pagination">
          <!-- <button v-for="(page, pageIndex) in pageCount" :key="pageIndex" @click="changePage(page)">{{page}}</button> -->
          <button v-if="currentPage>1" @click="changePage(1)" :class="{active:currentPage===1}">1</button>
          <span v-if="currentPage>3">...</span>
          <button v-if="currentPage>2" @click="changePage(currentPage-1)">{{currentPage-1}}</button>
          <button v-if="currentPage!==pageCount" :class="{active:currentPage>1 && currentPage<pageCount}"  @click="changePage(currentPage)">{{currentPage}}</button>
          <button v-if="currentPage+1 < pageCount" @click="changePage(currentPage+1)">{{currentPage+1}}</button>        
          <span v-if="currentPage<pageCount-2">...</span>
          <button @click="changePage(pageCount)" :class="{active:currentPage===pageCount}">{{pageCount}}</button>
        </div>
      </div>
      <div v-else>Nodata</div>
    </div>
  </div>
    <Footer/>
</main>
</template>