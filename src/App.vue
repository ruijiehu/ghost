<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="less">
@import url('~@/styles/common.less');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #333;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
