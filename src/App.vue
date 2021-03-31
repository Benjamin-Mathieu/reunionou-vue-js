<template>
  <div id="app">
    <Loading v-if="$store.state.loading"/>
    <Sidebar/>
    <router-view class="main"/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Loading from '@/components/Loading.vue';


export default {
    components: {
        Sidebar,
        Loading
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
