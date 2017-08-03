<template>
  <div id="app">
    <h1>AlloyTeam</h1>
    <ul>
      <li><router-link to="/scroll">滚动</router-link></li><br>
      <li><router-link to="/refresh">下拉刷新</router-link></li><br>
      <li><router-link to="/load">上拉加载</router-link></li><br>
      <li><router-link to="/qqboard">QQ资料卡</router-link></li><br>
    </ul>
    <transition name="tranx">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  body {
    overflow: hidden;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  // 头部样式
  .header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    .title {
      margin: 0;
    }
    .back {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 20px;
    }
  }

  .tranx-enter-active, .tranx-leave-active {
    transition: all .3s;
  }
  .tranx-enter, .tranx-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    transform: translate3d(100%, 0, 0);
  }
</style>
