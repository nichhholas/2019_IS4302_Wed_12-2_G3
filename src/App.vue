<template>
  <div id="app">
      <!--<router-link to="/">Home</router-link>-->
      
      <router-view/>

  
  </div>
</template>

<script>
//import Login from "./components/Login";

export default {
  name: "App",
  components: {}
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>