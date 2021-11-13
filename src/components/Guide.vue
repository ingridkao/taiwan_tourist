<script>
import {defineComponent } from 'vue'
import {GetTdxData} from "/src/assets/js/commom.js"
import {citiy, apiType} from "/src/assets/js/commom.js"
import Illustration from '/src/assets/img/illustration.svg'
import Time from '/src/assets/img/Time.svg'
import share from '/src/assets/img/share.svg'
import loction from '/src/assets/img/Location.svg'
import loction_g from '/src/assets/img/Location_g.svg'
import calling from '/src/assets/img/Calling.svg'

export default defineComponent({
  data(){
    return {
      currentCity : null,
      mainData: [],
      citiy,
      apiType,
      Illustration,Time,share,loction, loction_g, calling
    }
  },
  created(){
    if(this.$route.params && this.$route.params.city){
      this.currentCity = this.$route.params.city
    }
  },
  mounted() {
    if(this.currentCity){
      const check = Object.keys(citiy).find(item => item === this.currentCity)
      if(check){
        apiType.map(item => {
          GetTdxData(
            `${item.url}/${this.currentCity}`, 
            {
              '$top': 3,
              '$skip': Math.floor(Math.random()*10)
            }
          ).then(res=>{
            console.log(res);
            this.mainData.push(res)
          })
        })
      }
    }
  },
  methods: {
    routeToPage3(target){
      console.log(target);
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
    }
  }
})

</script>

<template>
<main id="guidePage" class="container">
  <aside>
    1
  </aside>
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
            <span>{{apiType[dataIndex]['title']}}</span>
          </div>
          <button class="textBtn" @click="routeToPage3(apiType[dataIndex]['index'])">更多{{apiType[dataIndex]['name']}}推薦</button>
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
#guidePage{
  display: flex;
  // flex-wrap: wrap;
  flex-direction: row;
  background: #F4F4F4;
  width: 100vw;
  >aside{
    flex: 0 0 14rem;
  }
  >div{
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: calc(100vw - 14rem);
    width: 100%;
    padding: 1rem;
    >*{
      width: 100%;
      padding: 0.5rem 1rem 0 1rem;
    }
    header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 18rem;
      box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.04);
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
  // main{
  //   flex-wrap: wrap;
  //   flex-direction: row;
  //   height: 30rem;
  //   >*{
  //     display: flex;
  //     justify-content: start;
  //     align-items: center;
  //     flex: 1;
  //   }

  //   .illustrationBox{
  //     flex-grow: 1;
  //     flex-shrink: 1;
  //     flex-basis: min-content;
  //     padding: 0 10%;
  //     img{
  //       width: 100%;
  //     }
  //   }
  // }
}
// .logo_box{
//   height: 5rem;
//   img{
//     height: 100%;
//     &.big{
//       display: block;
//     }
//     &.small{
//       display: none;
//     }
//   }
// }
.ellipsis{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mainData_container{
  width: 100%;
  text-align: left;
  .titleBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 1.25rem;
  }
  .card_container{
    display: flex;
    flex-direction: row;
    align-items: start;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 0;
  }
}
.cardItem{
  flex: 0 0 32%;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  .imgBox{
    // width: 100%;
    height: 15.25rem;
    overflow: hidden;
    text-align: center;
    img{
      height:  100%;
    }
  }
  .textBox{
    padding: 0.5rem 1rem 1rem 1rem;
    h5{
      font-size: 1.1rem;
      margin-bottom: .5rem;
    }
    h6{
      color: rgba(0,0,0,0.6);
      font-size: 1rem;
      font-weight: normal;
    }
  }
}
.iconText{
    display: flex;
    flex-direction: row;
    align-items: center;
    img{
      margin-right: 0.5rem;
    }
    &.inline{
      display: inline-flex;
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