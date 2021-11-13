<script setup>
// import Header from './components/Header.vue'
</script>

<template>
  <!-- <Header/> -->
  <router-view />
</template>

<style lang="scss">
[data-theme="dark"] {
  --bg-color1: #2c3e50;
  --font-color: #fff;
}
[data-theme="light"] {
  --bg-color1: #fff;
  --font-color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: var(--bg-color1);
  color: var(--font-color);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
button{
  border-radius: 8px;
  font-size: 14px;
  padding: 6px;
  cursor: pointer;
}
input{
  outline: none;
  padding: 0 0.5rem;
}
a{
  text-decoration: none;
  color: #3FB195;
}
.textBtn{
  color: #3FB195;
  border: none;
  background: transparent;
  font-size: 1.1rem;
}
</style>
