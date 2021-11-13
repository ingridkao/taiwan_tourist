
<script>
import { defineComponent } from 'vue'
import Illustration from '/src/assets/img/illustration.svg'

import Time from '/src/assets/img/Time.svg'
import share from '/src/assets/img/share.svg'
import loction from '/src/assets/img/Location.svg'
import loction_g from '/src/assets/img/Location_g.svg'
import calling from '/src/assets/img/Calling.svg'
export default defineComponent({
    data(){
        return {
            Illustration,Time,share,loction, loction_g, calling
        }
    },
    props: {
        currentType: {
            type: String,
            default: ''
        },
        cardItem: {
            type: Object,
            default: () => {}
        },
    },
    // components: {},
    methods:{
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
<div class="cardItem" @click="routeToPage4(cardItem)">
    <div v-if="cardItem.Picture && cardItem.Picture.PictureUrl1" class="imgBox">
        <!-- <img :src="cardItem.Picture.PictureUrl1" alt="cardItem.Picture.PictureDescription1"> -->
        <div class="imgDiv" :style="{'backgroundImage': `url(${cardItem.Picture.PictureUrl1})`}" role="img" :alt="cardItem.Picture.PictureDescription1"/>
    </div>
    <div v-else class="imgBox">
        <img :src="Illustration" alt="沒有圖片">
    </div>

    <div class="textBox">
        <h5 class="ellipsis">
            {{cardItem.Name}}
        </h5>
        <h6 class="iconText" v-if="currentType !== 'Hotel'">
            <img :src="Time">
            <span v-if="cardItem.Cycle" class="ellipsis">{{cardItem.Cycle}}</span>
            <span v-else-if="cardItem.StartTime || cardItem.EndTime" class="ellipsis">{{(cardItem.StartTime)? cardItem.StartTime.slice(0, 10): '' }} ~ {{(cardItem.EndTime)? cardItem.EndTime.slice(0, 10): '' }}</span>
            <span v-else class="ellipsis">{{cardItem.OpenTime? cardItem.OpenTime: '-'}}</span>
        </h6>
        <h6 class="iconText">
            <img :src="loction_g">
            <span v-if="cardItem.Address" class="ellipsis">{{cardItem.Address}}</span>
            <span v-else class="ellipsis">{{cardItem.Location? cardItem.Location: cardItem.City}}</span>
        </h6>
        <h6 class="iconText" v-if="currentType === 'Hotel'">
            <img :src="calling">
            {{cardItem.Phone? cardItem.Phone: '-'}}
        </h6>
    </div>
</div>
</template>
<style lang="scss" scoped>
.cardItem{
    position: relative;
    flex: 0 0 32%;
    cursor: pointer;
    margin: 0.5rem 0;
    overflow: hidden;
    box-shadow: 0px 14px 24px rgba(0,0,0,0.1);
    border-radius: 16px;
    .imgBox{
        height: 12rem;
        text-align: center;
        border-radius: 16px 16px 0px 0px;
        overflow: hidden;

        >*{height: 100%;}
        .imgDiv{
            background-size: cover;
            background-position: center;
        }
    }
    .textBox{
        text-align: left;
        padding: 0.5rem 1rem;
        box-sizing: border-box;
    }
    &:after{
        content: '';
        box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.04);
    }
}

</style>