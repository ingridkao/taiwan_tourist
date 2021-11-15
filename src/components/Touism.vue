<script>
import {defineComponent } from 'vue'
import { mapState } from "vuex"

import {GetTdxData} from "/src/assets/js/commom.js"
import {citiy, apiType} from "/src/assets/js/commom.js"

import Cards from "/src/components/Cards.vue"

export default defineComponent({
  data(){
    return {
      currentCity : null,
      currentType : null,
      mainData: [],
      dataCount: 0,
      limit: 9,
      currentPage: 1,
      processData: []
    }
  },
  mounted() {
    this.checkParams(this.$route.params)
  },
  watch: {
    $route(to, from) {
      if(to.name != from.name){
        this.checkParams(to.params)
      }
    },
    searchtext(){
      this.fetchData()
    }
  },
  components: {Cards},
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
    },
    changePage(page){
      this.currentPage = page
      this.setPageData()
    }
  }
})

</script>

<template>
  <div id="touismPage" class="page_container" :class="{hasHeader: !navToggle, fullPage}">
    <header>
      <h4 v-if="currentCity">{{cityTitle}}</h4>
      <h4 v-else>{{apiTypeTitle}}</h4>
    </header>
    <div class="mainData_container">
      <div class="card_container" v-if="mainData.length > 0">
        <Cards v-for="(cardItem, cardIndex) in processData" :key="cardIndex" :cardItem="cardItem" :currentType="currentType"/>
      </div>
      <div v-else>Nodata</div>

      <div v-if="mainData.length > 0" class="pagination">
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
  </div>
</template>