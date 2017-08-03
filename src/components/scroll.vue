<template lang="html">
  <section class="scroll">
    <header class="header">
      <i class="back fa fa-chevron-left" @click="back"></i>
      <span class="title">内容滚动</span>
    </header>
    <ul ref="target">
      <li v-for="(item, index) in 40">{{index}}</li>
    </ul>
  </section>
</template>

<script>
  import Transform from 'css3transform'
  import AlloyTouch from 'alloytouch'

  export default {
    mounted() {
      let target = this.$refs.target
      Transform(target, true)

      var obj = new AlloyTouch({
        touch: '.scroll', // 反馈触摸的dom
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
          console.log(value)
        },
        pressMove: function (evt, value) {
          // console.log(evt.deltaX, evt.deltaY, value)
          // console.log(evt.deltaY, value)
        },
        animationEnd: function (value) {
          // console.log(value)
        }
      })
      console.log(obj)
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="css" scoped>
  *{
    margin: 0;
    padding: 0;
  }
  ul {
    margin-top: 40px;
  }
  .scroll {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    background: #f1f1f1;
  }
  li{
    padding-top: 20px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #eee;
  }
</style>
