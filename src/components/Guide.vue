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

import AsideMenu from "/src/components/AsideMenu.vue"

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
    ...mapState(["searchtext"])
  },
  watch: {
    $route(to, from) {
      if(to.params && to.params.city){
        this.currentCity = to.params.city
        this.fetchData()
      }
    },
    'searchtext'(){
      this.fetchData()
    }
  },
  components: {AsideMenu},
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
          //back landingpage
        }
      }else{
         //back landingpage
      }
    },
    routeToPage3(target){
      console.log(target);
      this.$router.push({ 
        name: 'Touism', 
        params: { 
          city: this.currentCity,
          type: target
              // 'ID': cardItem.ID
        }
      })


    },
    routeToPage4(cardItem){
      console.log(cardItem.ID);
      // this.$router.push({ 
      //   name: 'Guide', 
      //   params: { 
      //     city: cityIndex,
              // 'ID': cardItem.ID
      //   }
      // })
    },
    getCity(target, index){
      return apiType[target]? apiType[target][index]: '-'
    },
    test(e){
      console.log(e);
    }
  }
})
</script>

<template>
<main id="guidePage" class="page_container">
  <AsideMenu @update="test"/>
  <div>
    <header>
      <div>
        <h4>探索。</h4>
        <h4>{{citiy[currentCity]}}</h4>
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
        <div class="card_container">
          <div v-for="(cardItem, cardIndex) in dataItem" :key="cardIndex" class="cardItem" @click="routeToPage4(cardItem)">
            <div v-if="cardItem.Picture && cardItem.Picture.PictureUrl1" class="imgBox">
              <img :src="cardItem.Picture.PictureUrl1" :alt="cardItem.Picture.PictureDescription1">
            </div>
            <div v-else class="imgBox">
              <img :src="Illustration" alt="沒有圖片">
            </div>
            <div class="textBox">
              <h5 class="ellipsis">
                {{cardItem.Name}}
              </h5>
              <h6 class="iconText" v-if="dataIndex !== 3">
                <img :src="Time">
                <span v-if="cardItem.Cycle" class="ellipsis">{{cardItem.Cycle}}</span>
                <span v-else-if="cardItem.StartTime || cardItem.EndTime" class="ellipsis">{{(cardItem.StartTime)? cardItem.StartTime.slice(0, 10): '' }} ~ {{(cardItem.EndTime)? cardItem.EndTime.slice(0, 10): '' }}</span>
                <span v-else class="ellipsis">{{cardItem.OpenTime? cardItem.OpenTime: '-'}}</span>
              </h6>
              <h6 class="iconText">
                <img :src="loction_g">
                <span v-if="cardItem.Address" class="ellipsis">{{cardItem.Address}}</span>
                <span v-else>{{cardItem.Location? cardItem.Location: (cardItem.Class3? cardItem.Class3: (cardItem.Class2? cardItem.Class2: cardItem.Class))}}</span>
              </h6>
              <h6 class="iconText" v-if="dataIndex === 3">
                <img :src="calling">
                {{cardItem.Phone? cardItem.Phone: '-'}}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<style lang="scss" scoped>
$shadow: 0px 14px 24px rgba(0, 0, 0, 0.04);
.page_container{
  >div{
    header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 18rem;
      box-shadow: $shadow;
      background: #fff;
      border-radius: 16px;
      >div{
        flex: 0 0 6rem;
        font-size: 2rem;
      }
      >img{
        height: 100%;
      }
    }
  }
}

.mainData_container{
  width: 100%;
  text-align: left;
  .titleBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.cardItem{
  flex: 0 0 32%;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  margin: 0.5rem 0;
  box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.04);
  .imgBox{
    height: 12rem;
    overflow: hidden;
    text-align: center;
    img{
      height:  100%;
    }
  }
  .textBox{
    padding: 0.5rem 1rem 1rem 1rem;
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