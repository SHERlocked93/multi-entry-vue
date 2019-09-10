<template>
  <div id="app">
    <h1>
      <img src="~/assets/logo.png">
      <p>入口模版1</p>
    </h1>
    
    <div class='row'>
      <b class='row-left'>点击跳转不同入口： </b>
      <a href='/entry1.html'>entry1</a>
      <a href='/entry2.html'>entry2</a>
      <a href='/entry3.html'>entry3</a>
    </div>
    
    <hr>
    
    <div class='row'>
      <b class='row-left'>点击跳转不同路由：</b>
      <router-link to="/">helloword</router-link>
      <router-link to="/test1">test1</router-link>
    </div>
    
    <hr>
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    
    h1 {
      text-align: center;
      margin: 40px;
    }
    
    .row {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      
      .row-left {
        width: 300px;
      }
      
      a {
        margin-right: 20px;
      }
    }
  }
</style>
