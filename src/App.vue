<template>
  <div id="app">
    <Sidebar/>
    <router-view class="main"/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
    components: {
        Sidebar
    }
  }
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0; padding: 0;
  
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Roboto, Geneva, Tahoma, sans-serif;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  .hide {
    display: none;
  }
  .main{
    grid-column-start: 2;
    grid-column-end: 8;
  }

}

</style>
