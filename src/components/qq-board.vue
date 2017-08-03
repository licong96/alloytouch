<template lang="html">
  <section class="board">
    <i class="back fa fa-chevron-left" @click="back"></i>
    <!-- 顶部 -->
    <header class="headers" ref="header"></header>
    <!-- 图片 -->
    <div class="user-logo-wrapper" ref="userLogo">
      <div class="user-logo">
        <img class="img" src="http://q3.qlogo.cn/g?b=qq&k=dsIAz3gs7bWoJ8oSicpwLcw&s=100">
      </div>
    </div>
    <!-- 这才是主题内容 -->
    <section class="wrapper" ref="wrapper">
      <div class="scroller" ref="scroller">
        <ul ref="minHeight">
          <li class="item" v-for="(item, index) in data">{{index}}</li>
        </ul>
        <div class="loading-more">正在加载中，请稍后...</div>
      </div>
    </section>
  </section>
</template>

<script>
  import Transform from 'css3transform'
  import AlloyTouch from 'alloytouch'

  export default {
    data () {
      return {
        data: 20
      }
    },
    created() {
      this.alloyTouch = null
      this.loading = false
      this.minHeight = null
    },
    mounted() {
      this.alloy()
    },
    methods: {
      alloy() {
        let self = this
        let header = this.$refs.header
        let userLogo = this.$refs.userLogo
        let scroller = this.$refs.scroller   // 保存全局，方便调用

        // 内容高度
        this.minHeight = this.$refs.minHeight

        Transform(header)
        header.originY = -70        // ransform-origin为 center top
        header.translateY = -70
        Transform(userLogo)
        Transform(scroller, true)   // true代表关闭透视投影，因为scroller里面是有文本，防止文本在IOS中模糊

        this.alloyTouch = new AlloyTouch({
          touch: this.$refs.wrapper,
          vertical: true,
          target: scroller,
          property: 'translateY',
          maxSpeed: 2,
          outFactor: 0.2,
          min: window.innerHeight - (50 * 20) - 202 - 50,
          max: 0,
          change: function (value) {
            if (value <= this.min + 5 && !self.loading) {   // 下拉加载更多
              self.loading = true
              self.loadMore()
            }

            // 因为上下文都在改变value的值，所以先后顺序不能变

            if (value < 0) {      // 上滑缩小
              if (value < -140) {     // 规定最小值
                value = -140
              }
              let scaleY = (240 + value) / 240    // 计算缩小比例
              // console.log(scaleY)
              header.scaleY = scaleY
              userLogo.scaleX = userLogo.scaleY = scaleY
              userLogo.translateY = value / 1.7
            } else {      // 下滑放大
              let scaleY = 1 + value / 240      // 计算放大比例
              // console.log(scaleY)
              header.scaleY = scaleY
              userLogo.scaleX = userLogo.scaleY = scaleY
              userLogo.translateY = value / 1.7
            }
          },
          touchStart: function () {
            self.reastMin()
          }
        })
      },
      reastMin() {    // 计算min高度
        this.alloyTouch.min = window.innerHeight - this.minHeight.clientHeight - 202 - 50
      },
      loadMore() {    // 加载数据
        setTimeout(() => {
          this.data += 10
          this.loading = false
          this.reastMin()
        }, 1000)
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .board {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: #fff;
  }
  .back {
    position: absolute;
    top: 20px;
    left: 10px;
    z-index: 92;
    color: #fff;
  }
  .headers {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 90;
    width: 100%;
    height: 140px;
    background-color: #12B7F5;
  }
  .user-logo-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 91;
    width: 100%;
    text-align: center;
    font-size: 0;
    .user-logo {
      display: inline-block;
      margin-top: 90px;
      border: 2px solid #fff;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #ededed;
      box-sizing: border-box;
      .img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .wrapper {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    .scroller {
      padding-top: 200px;
    }
    .item {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      box-sizing: border-box;
    }
    .loading-more {
      padding: 15px 0 20px;
      height: 14px;
      text-align: center;
      color: #777;
    }
  }

</style>
