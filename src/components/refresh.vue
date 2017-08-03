<template lang="html">
  <section class="refresh">
    <header class="header">
      <i class="back fa fa-chevron-left" @click="back"></i>
      <span class="title">下拉刷新</span>
    </header>
    <div class="loading" ref="pull">
      <i class="fa fa-long-arrow-down" :class="{pull: pullrotateZ}" v-show="!pulseClass"></i>
      <span class="pulltext">{{pulltext}}</span>
      <i class="fa fa-spinner fa-pulse" v-show="pulseClass"></i>
    </div>
    <div class="wrap" ref="touch">
      <ul class="ul" ref="target">
        <li class="li" v-for="(item, index) in data">{{data - index}}</li>
      </ul>
    </div>
  </section>
</template>

<script>
  import Transform from 'css3transform'
  import AlloyTouch from 'alloytouch'

  export default {
    data () {
      return {
        data: 30,
        pulltext: '下拉刷新', // 提示文字
        pullrotateZ: false,  // 图标旋转
        pulseClass: false,  // 切换图标
        loadTime: true      // 只加载一次
      }
    },
    mounted() {
      let self = this
      let target = this.$refs.target
      let pull = this.$refs.pull

      Transform(target, true)
      Transform(pull, true)

      var obj = new AlloyTouch({
        touch: this.$refs.touch, // 反馈触摸的dom
        vertical: true, // 不必需，默认是true代表监听竖直方向touch
        target: target, // 运动的对象
        property: 'translateY',  // 被滚动的属性
        sensitivity: 1, // 不必需,触摸区域的灵敏度，默认值为1，可以为负数
        factor: 1,  // 不必需,默认值是1代表touch区域的1px的对应target.y的1
        min: window.innerHeight - target.clientHeight - 40,   // 不必需,滚动属性的最小值
        max: 0,   // 不必需,滚动属性的最大值
        step: 40,
        initialValue: 0, // 初始值
        change: function (value) {
          // console.log(value)
          pull.translateY = value
        },
        touchMove: function (evt, value) {
          if (value > 80 && self.loadTime) {
            self.pullrotateZ = true
            self.pulltext = '松手加载'
          } else if (self.loadTime) {
            self.pullrotateZ = false
            self.pulltext = '下拉加载'
          }
        },
        touchEnd: function (evt, value) {
          if (value > 80) {
            self.loadTime = false
            self.pulseClass = true
            self.pulltext = '加载中'
            this.to(80)
            self.ajax(this)
            return false
          }
        },
        animationEnd: function (value) {
          // console.log(value)
        }
      })
      console.log(obj)
    },
    methods: {
      ajax(at) {    // 发送请求
        let self = this
        setTimeout(function () {
          self.data += 5
          at.to(at.initialValue)
          at.min -= 36 * 5
          self.loadTime = true
          self.pulseClass = false
        }, 2000)
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .refresh {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: #f5f5f5;
    .loading {
      position: absolute;
      top: -25px;
      left: 0;
      z-index: 2;
      width: 100%;
      text-align: center;
      .fa {
        font-size: 30px;
        color: #2196f3;
        transition: all .3s;
        &.pull {
          transform: rotateZ(180deg);
        }
      }
      .pulltext {
        position: absolute;
        bottom: -20px;
        left: 50%;
        margin-left: -50px;
        width: 100px;
        text-align: center;
        font-size: 14px;
        color: #333;
      }
    }
    .wrap {
      position: absolute;
      top: 40px;
      left: 0;
      z-index: 1;
      width: 100%;
      background-color: #fff;
      .li {
        width: 100%;
        height: 35px;
        line-height: 35px;
        border-top: 1px solid #eee;
      }
    }
  }
</style>
