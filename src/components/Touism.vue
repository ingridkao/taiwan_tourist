<script>
import {defineComponent } from 'vue'
import { mapState } from "vuex"

import {GetTdxData} from "/src/assets/js/commom.js"
import {citiy, apiType} from "/src/assets/js/commom.js"

import AsideMenu from "/src/components/AsideMenu.vue"
import Cards from "/src/components/Cards.vue"

export default defineComponent({
  data(){
    return {
      citiy,
      currentCity : null,
      currentType : null,
      mainData: [],
      dataCount: 0,
      limit: 9,
      currentPage: 1,
      processData: []
    }
  },
  created(){
    if(this.$route.params && (this.$route.params.city || this.$route.params.type)){
      this.currentCity = this.$route.params.city
      this.currentType = this.$route.params.type
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    $route(to, from) {
      if(to.params && (to.params.city || to.params.type)){
        this.currentCity = to.params.city
        this.currentType = to.params.type
        this.fetchData()
      }else{
        //back langing page
      }
    },
    'searchtext'(){
      this.fetchData()
    }
  },
  components: {AsideMenu, Cards},
  computed: {
    ...mapState(["searchtext"]),
    pageCount(){
      return parseInt(this.dataCount/this.limit) + (this.dataCount%this.limit > 0? 1: 0)
    }
  },
  methods: {
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
        //back langing page
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
<main class="page_container">
  <AsideMenu/>
  <div>
    <header>
      <h4 v-if="currentCity">{{citiy[currentCity]}}</h4>
    </header>
    <div class="mainData_container">
      <div class="card_container" v-if="mainData.length > 0">
        <Cards v-for="(cardItem, cardIndex) in processData" :key="cardIndex" :cardItem="cardItem" :currentType="currentType"/>
      </div>
      <div v-else>Nodata</div>
      <div v-if="mainData.length > 0" class="pagination">
        <!-- <button v-for="(page, pageIndex) in pageCount" :key="pageIndex" @click="changePage(page)">{{page}}</button> -->
        <button @click="changePage(1)" :class="{active:currentPage===1}">1</button>
        <span v-if="currentPage>3">...</span>
        <button v-if="currentPage>2" @click="changePage(currentPage-1)">{{currentPage-1}}</button>
        <button v-if="currentPage!==1 && currentPage!==pageCount" :class="{active:currentPage>1 && currentPage<pageCount}"  @click="changePage(currentPage)">{{currentPage}}</button>
        <button v-if="currentPage!==pageCount" @click="changePage(currentPage+1)">{{currentPage+1}}</button>        
        <span v-if="currentPage<pageCount-2">...</span>
        <button @click="changePage(pageCount)" :class="{active:currentPage===pageCount}">{{pageCount}}</button>
      </div>
    </div>
  </div>
</main>
</template>

<style lang="scss" scoped>
$primaryColor: #3FB195;
.page_container{
  >div{
    header{
      text-align: left;
    }
  }
}

.pagination{
  color: $primaryColor;
  button{
    background: #FFFFFF;
    border: 1px solid $primaryColor;
    color: $primaryColor;
    width: 2rem;
    margin: 0 0.2rem;
    &.active{
      background: $primaryColor;
      color: #FFFFFF;
    }
  }
}
@media only screen and (max-width: 640px) {
//   .container{
//     main{
//       flex-direction: column-reverse;
//       height: auto;
//       .illustrationBox{
//         width: 60%;
//         margin: auto;
//       }
//     }
//   }
//   .logo_box{
//     height: 3rem;
//     img{
//       &.big{
//         display: none;
//       }
//       &.small{
//         display: block;
//       }
//     }
//   }
}

</style>