<template>
  <div id="app">
    <Sidebar/>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
export default {
  components: {
    Sidebar
  },
  name: 'Home',
  
}
</script>


<style>
* {
  box-sizing: border-box;
  margin: 0; padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Roboto, Geneva, Tahoma, sans-serif;
  background-color: #C8C8C8;
}

</style>
