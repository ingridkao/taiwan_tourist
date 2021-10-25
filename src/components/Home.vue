<script>
import { defineComponent } from "vue"

import HelloWorld from "/src/components/HelloWorld.vue"

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld
  }
})
</script>

<template>
  <div>
    <h1>This is a home page</h1>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

