<template lang="html">
  <section class="load">
    <header class="header">
      <i class="back fa fa-chevron-left" @click="back"></i>
      <span class="title">上拉加载</span>
    </header>
    <section class="load-wrap" ref="touch">
      <ul ref="target">
        <li class="li" v-for="(item, index) in data">{{index}}</li>

        <div class="foot-load" v-show="foodshow">
          <span><i class="fa fa-spinner fa-pulse"></i>{{message}}</span>
        </div>
      </ul>
    </section>
  </section>
</template>

<script>
  import Transform from 'css3transform'
  import AlloyTouch from 'alloytouch'

  export default {
    data() {
      return {
        data: 30,
        message: '上拉加载更多数据',
        loadTime: true,
        foodshow: false
      }
    },
    mounted () {
      let self = this
      let target = this.$refs.target

      Transform(target, true)

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
        },
        touchMove: function (evt, value) {
          if (value < this.min - 50) {
            self.foodshow = true
          } else {
            self.foodshow = false
          }
        },
        touchEnd: function (evt, value) {
          if (value < this.min - 50 && self.loadTime) {
            self.foodshow = true
            this.to(this.min - 50)
            self.loadTime = false
            self.ajax(this)
            return false
          }
        },
        animationEnd: function (value) {
          // console.log(value)
        }
      })
      obj.to(0)
    },
    methods: {
      ajax(at) {
        let self = this
        setTimeout(function () {
          self.data += 5
          // at.to(this.min)
          at.min -= 41 * 5
          self.loadTime = true
          self.foodshow = false
        }, 2000)
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .load {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: #fff;
    .load-wrap {
      position: absolute;
      top: 40px;
      left: 0;
      z-index: 2;
      width: 100%;
      .li {
        height: 40px;
        line-height: 40px;
        background-color: #f2f2f2;
        border-bottom: 1px solid #ddd;
      }
    }
    .foot-load {
      position: absolute;
      bottom: -30px;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 14px;
      animation: transY .3s;
    }
  }

  @keyframes transY {
    0% {
      opacity: 0;
      transform: translate3d(0, 50px, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
</style>
