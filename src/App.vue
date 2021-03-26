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
    },
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
  background-color: whitesmoke; height: 100vh;
  .hide {
    display: none;
  }
}

</style>
