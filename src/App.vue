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
input {
    font-size: 1rem;
    outline: none;
    border: none;
    width: 100%;
    background: transparent;
}
::placeholder {
  opacity: 0.8;
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
.ellipsis{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
$shadow: 0px 14px 24px rgba(0, 0, 0, 0.04);
.page_container{
  display: flex;
  flex-direction: row;
  background: #F4F4F4;
  width: 100vw;
  >aside{
    flex: 0 0 14rem;
    background: #fff;
    box-shadow: $shadow;
  }
  >div{
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: calc(100vw - 14rem);
    width: calc(100vw - 14rem);
    padding: 1rem;
    >*{
      width: 100%;
      padding: 0.5rem 1rem 0 1rem;
    }
  }
}
h4{
  font-size: 1.25rem;
}
h5{
  font-size: 1.1rem;
  margin-bottom: .5rem;
}
h6{
  color: rgba(0,0,0,0.6);
  font-size: 1rem;
  font-weight: normal;
}

</style>
