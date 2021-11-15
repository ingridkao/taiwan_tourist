<script>
import { defineComponent } from "vue"
import L from "leaflet"

import "leaflet/dist/leaflet.css"
export default defineComponent({
  data() {
    return {
      map: null,
      position: []
    }
  },
  props: {
    location: {
        type: Array,
        default: () => [0,0]
    },
  },
  mounted() {
    this.processPosition()
    this.map = L.map("mapContainer").setView(this.position, 15);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    L.marker(this.position).addTo(this.map);
  },
  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    processPosition(){
      if(this.location[0] === 0 && this.location[1] === 0){
        this.position = [25.056, 121.50]
      }else{
        this.position = this.location
      }  
    }
  }
})
</script>

<template>
    <div id="mapContainer"/>
</template>

<style lang="scss" scoped>
#mapContainer {
  width: 100%;
  height: 20rem;
}
@media only screen and (max-width: 640px) {}
</style>

