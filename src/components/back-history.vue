<template>
  <a class="wrappper" href="javascript:;" @click="handleBack">
    <img :src="require('@/assets/img/back.png')" />
    <span>返回</span>
  </a>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleBack () {
      this.$router.back(-1)
    }
  },
  components: {},
  mounted () {}
}
</script>
<style scoped lang="less">
.wrappper {
  display: block;
  position: absolute;
  left: 22px;
  top: 25px;
  text-decoration: none;
  font-size: 16px;
  color: #000000;
  display: flex;
  align-items: center;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -10px;
  }
  img {
    width: 28px;
    height: 28px;
    margin-right: 10px;
  }
}
</style>
