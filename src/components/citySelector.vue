<script>
import { defineComponent } from "vue"
import Close from '/src/assets/img/close.svg'
import Arrow from '/src/assets/img/arrow.svg'
import {citiy} from "/src/assets/js/commom.js"
export default defineComponent({
  data(){
    return {
      Close,
      Arrow,
      citiyOption: citiy,
      cityBoxToggle:false,
      citySelect: null
    }
  },
  mounted() {
    document.addEventListener("click", this.bodyClose)
  },
  beforeDestroy() {
    document.removeEventListener("click", this.bodyClose)
  },
  components: {},
  methods:{
    bodyClose(e) {
      if (this.cityBoxToggle && this.$refs.cityBox && !this.$refs.cityBox.contains(e.target)) {
        this.cityBoxToggle = false
      }
    },
    routeTo(){
      const targetCity = Object.values(citiy).findIndex(item => item === this.citySelect)
      const cityIndex = Object.keys(citiy)[targetCity] 
      console.log(cityIndex);
      this.$router.push({ 
        name: 'Guide', 
        params: { 
          city: cityIndex
        }
      })
    }
  }
})
</script>
<template>
  <aside>
    <div class="selectBox">
      <div class="inputBox">
        <p>{{citySelect? citySelect: '目的地'}}</p>
        <button v-if="citySelect" @click="citySelect = null">
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
    <button class="search" v-if="citySelect" @click="routeTo">開始搜尋</button>
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
  padding: 0.55rem;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  .inputBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 0 0 4em;
    p{
      width: 3em;
      font-size: 18px;
      font-weight: normal;
      color: #222;
      padding: 0;
    }
    button{
      width: 1em;
      // height: 18px;
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
    padding: 1rem;
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
  margin: 0.5rem;
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

