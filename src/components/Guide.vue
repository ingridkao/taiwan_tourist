<script>
import {defineComponent } from 'vue'
export default defineComponent({
  data(){
    return {
      currentCity : null
    }
  },
  created(){
    if(this.$route.params && this.$route.params.city){
      this.currentCity = this.$route.params.city
    }
  },
  mounted() {
    // console.log(this.currentCity);
  }
})

</script>

<template>
  <div>
    <h1>This is a guide page</h1>
    <p>{{currentCity}}</p>
  </div>
</template>