<script>
import {defineComponent } from 'vue'
import { mapState } from "vuex"

import {GetTdxData} from "/src/assets/js/commom.js"
import {apiType} from "/src/assets/js/commom.js"

import ArrowLeft from '/src/assets/img/ArrowLeft.svg'
import Illustration from '/src/assets/img/illustration.svg'
import Time from '/src/assets/img/Time.svg'
import share from '/src/assets/img/share.svg'
import loction from '/src/assets/img/Location.svg'
import loction_g from '/src/assets/img/Location_g.svg'
import calling from '/src/assets/img/Calling.svg'

import Cards from "/src/components/Cards.vue"
import LeafletMap from "/src/components/LeafletMap.vue"

export default defineComponent({
  data(){
    return {
      ArrowLeft,
      Illustration,Time,share,loction, loction_g, calling,
      currentId : null,
      currentCity : null,
      currentType : null,
      currentTypeURL : null,
      currentTypeTitle : '景點',
      targetData: [],
      nearbyData: [],
      position: [0, 0],
      mapShow: false
    }
  },
  created(){
    if(this.$route.params){
      this.initData(this.$route.params)
    }else{
      //no data 
    }
  },
  mounted() {
    this.checkData()
  },
  watch: {
    $route(to, from) {
      if(to.params){
        this.initData(to.params)
        this.checkData()
      }else{
        //no data 
      }
    }
  },
  components: {Cards, LeafletMap},
  computed: {
    ...mapState(["navToggle", "fullPage", "informationObj"])
  },
  methods: {
    initData(paramsObj){
      this.currentCity = paramsObj.city
      this.currentType = paramsObj.type
      this.currentId = paramsObj.id
      const checkType = apiType.find(item => item.index === this.currentType)
      if(checkType){
        this.currentTypeURL = checkType.url
        this.currentTypeTitle = checkType.name
      }
    },
    checkData(){
      if(this.informationObj && Object.keys(this.informationObj).length > 0){
        this.targetData = {...this.informationObj}
        this.getLocationData()
      }else{
        this.fetchData()
      } 
    },
    getLocationData(){
      if(this.targetData && this.targetData.Position && this.targetData.Position.PositionLat && this.targetData.Position.PositionLon){
        const {PositionLat, PositionLon} = this.targetData.Position
        this.position = [PositionLat, PositionLon]
        this.mapShow = true

        this.nearbyData = []
        //尋找緯度25.05463, 經度121.46584 ,範圍150 公尺內的資料
        const params = {
          '$top': 4,
          '$spatialFilter': `nearby(${this.position[0]},${this.position[1]},500)`
        }
        GetTdxData(`${this.currentTypeURL}`,params).then(res=>{
          if(res.length> 0){
            this.nearbyData = res.filter(item => item.ID != this.currentId)
          }
        }).catch(error => {
            console.log(error);
        })
      }
    },
    fetchData(){
      if(this.currentTypeURL){
        this.targetData = {}
        const params = {
          '$filter': `ID eq '${this.currentId}'`
        }
        GetTdxData(`${this.currentTypeURL}`,params).then(res=>{
          this.targetData = res[0]
          this.getLocationData()
        }).catch(error => {
          console.log(error);
        })
      }else{
        //back langing page
      }
    },
    goBack(){
      if(this.currentType){
        this.$router.go(-1)
      }else{
        this.$router.push({ 
          name: 'Guide', 
          params: { 
            city: this.currentCity
          }
        })
      }
    }
  }
})

</script>

<template>
  <div id="informationPage" class="page_container" :class="{hasHeader: !navToggle, fullPage}">
    <div v-if="targetData" class="targetDataBox">
      <h4 class="iconText">
        <button @click="goBack"><img :src="ArrowLeft" alt="回上一頁"></button>
        <span v-if="targetData.Name">{{targetData.Name}}</span>
      </h4>
      <div class="imgBox">
        <div v-if="targetData.Picture && targetData.Picture.PictureUrl1" class="imgDiv" :style="{'backgroundImage': `url(${targetData.Picture.PictureUrl1})`}" role="img" :alt="targetData.Picture.PictureDescription1"/>
        <img v-else :src="Illustration" alt="沒有圖片" >
      </div>
      <div class="viewpointBox">
        <div class="textBox desc">
          <h6 class="iconText" v-if="targetData.Cycle">
              <img :src="Time">
              <span class="ellipsis">{{targetData.Cycle}}</span>
          </h6>
          <h6 class="iconText" v-if="targetData.StartTime || targetData.EndTime">
              <img :src="Time">
              <span class="ellipsis">{{(targetData.StartTime)? targetData.StartTime.slice(0, 10): '' }} ~ {{(targetData.EndTime)? targetData.EndTime.slice(0, 10): '' }}</span>
          </h6>
          <h6 class="iconText top" v-if="targetData.OpenTime">
              <img :src="Time">
              <span>{{targetData.OpenTime}}</span>
          </h6>
          <h6 class="iconText">
              <img :src="loction_g">
              <span class="ellipsis">{{targetData.Location? targetData.Location: targetData.City}}</span>
          </h6>
          <h6 class="iconText" v-if="targetData.Address">
              <img :src="loction_g">
              <span class="ellipsis">{{targetData.Address}}</span>
          </h6>
          <h6 class="iconText">
              <img :src="calling">
              {{targetData.Phone? targetData.Phone: (targetData.Organizer? targetData.Organizer: '-')}}
          </h6>
          <h6 class="hrefBox" v-if="targetData.WebsiteUrl">
              <a :href="targetData.WebsiteUrl" target="_blank">前往網站</a>
          </h6>
        </div>
        <div class="info">
          <h6 class="title">{{currentTypeTitle}}介紹</h6>
          <p>{{targetData.Description}}</p>
          <p>{{targetData.DescriptionDetail}}</p>
        </div>
      </div>
      <div class="transportation">
        <div class="mapBox" v-if="mapShow">
          <LeafletMap :location="position"/>
        </div>
        <div class="mapDesc" v-if="targetData.ParkingInfo">
          <h6 class="title">停車資訊</h6>
          {{targetData.ParkingInfo}}
        </div>
        <div class="mapDesc" v-if="targetData.ParkingPosition && Object.keys(targetData.ParkingPosition).length > 0">
          <h6 class="title">交通方式</h6>
          {{targetData.ParkingPosition}}
        </div>
      </div>
      <div class="nearbyBox" v-if="nearbyData.length > 0">
        <h6 class="title">附近{{currentTypeTitle}}</h6>
        <div class="card_container">
          <Cards v-for="(cardItem, cardIndex) in nearbyData" :key="cardIndex" :cardItem="cardItem" :currentType="currentType"/>
        </div>
      </div>
    </div>
    <div v-else>
      <img :src="Illustration" alt="找不到">
      <p>找不到{{currentTypeTitle}}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.iconText button{
  width: 3rem;
  height: 2rem;
  padding: 0;
}
.targetDataBox > div{
  margin: 1rem 0;
}
.imgBox{
  width: 100%;
  height: 20rem;
  margin: 1rem 0;
}
.viewpointBox{
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 0;
  .textBox{
    flex: 0 0 20rem;
  }
  .info{
    flex: 0 0 calc(100% - 21rem);
    p{
      margin-bottom: 1rem;
    }
  }
}
.transportation > div{
  margin-bottom: 1rem;
}
@media only screen and (max-width: 640px) {
  .viewpointBox{
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0;
    .textBox{
      flex: 1;
      width: 100%;
    }
    .info{
      flex: 1;
      width: 100%;
      margin-top: 1rem;
    }
  }
}

</style>
