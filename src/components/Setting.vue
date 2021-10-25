<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <div>
    <h1>This is a setting page</h1>
    <button type="button" @click="count++">count is: {{ count }}</button>
  </div>
</template>