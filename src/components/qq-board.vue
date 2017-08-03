<template lang="html">
  <section class="board">
    <!-- <i class="back fa fa-chevron-left" @click="back"></i> -->
    <div class="board-warp">

    </div>
  </section>
</template>

<script>
  export default {
    methods: {
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
    .board-wrap {
      position: absolute;
      top: 40px;
      left: 0;
      z-index: 2;
      width: 100%;
    }
  }
</style>
