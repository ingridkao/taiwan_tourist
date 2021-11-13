<script>
import { defineComponent } from "vue"
import { mapState } from "vuex"

import Close from '/src/assets/img/close.svg'
import Search from '/src/assets/img/Search.svg'
import Arrow from '/src/assets/img/arrow.svg'
import {citiy} from "/src/assets/js/commom.js"
export default defineComponent({
  data(){
    return {
      Close,
      Search,
      Arrow,
      routeName: null,
      citiyOption: citiy,
      cityBoxToggle:false,
      citySelect: null,
      keyword: this.searchtext
    }
  },
  created(){
    this.routeName = this.$route.name
    if(this.$route.params && this.$route.params.city){
      this.citySelect = citiy[this.$route.params.city] 
    }
  },
  mounted() {
    document.addEventListener("click", this.bodyClose)
  },
  beforeDestroy() {
    document.removeEventListener("click", this.bodyClose)
  },
  computed:{
    ...mapState(["searchtext"]),
    landingPage(){
      return this.routeName === 'LandingPage'
    }
  },
  watch: {
    $route(to, from) {
      this.routeName = to.name
      if(to.params && to.params.city){
        this.citySelect = citiy[to.params.city] 
      }
    } 
  },
  methods:{
    bodyClose(e) {
      if (this.cityBoxToggle && this.$refs.cityBox && !this.$refs.cityBox.contains(e.target)) {
        this.cityBoxToggle = false
      }
    },
    startSearch(){
      const targetCity = Object.values(citiy).findIndex(item => item === this.citySelect)
      const cityIndex = Object.keys(citiy)[targetCity] 
      if(this.landingPage){
        this.$router.push({ 
          name: 'Guide', 
          params: { 
            city: cityIndex
          }
        })
      }else{
        this.$store.commit("keyinKeyword", this.keyword)
      }
    },
    clearSearch(){
      this.keyword = ''
      this.$store.commit("keyinKeyword", this.keyword)
    }
  }
})
</script>
<template>
  <aside>
    <div v-if="!landingPage" class="selectBox text">
      <div class="inputBox">
        <input type="text" v-model="keyword" placeholder="搜尋關鍵字">
      </div>
      <button v-if="keyword != ''" @click="clearSearch">
        <img :src="Close" alt="Close"/>
      </button>
      <button v-else>
        <img :src="Search" alt="Search"/>
      </button>
    </div>
    <div class="selectBox">
      <div class="inputBox">
        <p>{{citySelect? citySelect: '目的地'}}</p>
        <button v-if="citySelect && landingPage" @click="citySelect = null">
          <img :src="Close" alt="Close"/>
        </button>
      </div>
      <button class="arrow" :class="{open: cityBoxToggle}" @click.stop="cityBoxToggle = !cityBoxToggle">
        <img :src="Arrow" alt="arrow"/>
      </button>
    </div>
    <div class="cityBox" :class="{show: cityBoxToggle}" ref="cityBox">
      <button 
        v-for="(item, index) in citiyOption"
        :key="index"
        :class="{selected : citySelect == item}"
        @click="citySelect = item"
      >{{item}}</button>
    </div>
    <button class="search" v-if="citySelect" @click="startSearch">開始搜尋</button>
  </aside>
</template>

<style scoped lang="scss">
aside{
  display: flex;
  flex-direction: column;
  margin: 1rem;
  >*{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
}
.selectBox{
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #FAFAFA;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 0.25rem 0.55rem 0.25rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  &.text .inputBox{
    flex: 0 0 calc(100% - 2rem);
  }
  .inputBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 0 0 4em;
    p{
      width: 3em;
      font-size: 1rem;
      font-weight: normal;
      color: #222;
      padding: 0;
    }
    button{
      width: 1em;
      padding: 0;
    }
  }
  >button{
    flex: 0 0 2rem;
    height: 1.5rem;
  }
}
button{
  background: transparent;
  border: none;
  img{
    height: 100%;
  }
  &.arrow{
    padding: 0;
    transform: rotate(-180deg);
    transition: 1s ease-in-out;
    &.open{
      transform: rotate(0deg);
    }
  }
}
.cityBox{
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  transition: 1s ease-in-out;
  height: 0;
  &.show{
    padding: .25rem;
    height: 22rem;
  }
  button{
    flex: 0 0 4rem;
    border: 1px solid #3FB195;
    &.selected{
      background: #3FB195;
      color: #FFFFFF;
    }
  }
}
.search{
  display: block;
  width: 10rem;
  background: #3FB195;
  color: #FFFFFF;
  font-size: 18px;
  margin: 0.5rem auto;
  text-align: center;
}
@media only screen and (max-width: 640px) {
  .selectBox{
    width: 10rem; 
  }
  .cityBox{
    justify-content: start;
    &.show{
      height: auto;
    }
    button{
      margin: 6px;
      flex: 0 0 5rem;
      font-size: 16px;
    }
  }
}
</style>

