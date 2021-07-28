<template>
  <div class="login">
    <img class="bg-img" src="@/assets/img/login/login-background.jpg" alt="">
    <div class="login-mainframe">
      <div class="mf-left">
        <img class="mf-img" src="@/assets/img/login/login-main-frame.jpg" alt="">
      </div>
      <LoginDetail class="login-detail" />
    </div>
  </div>
</template>

<script>
import LoginDetail from '@/views/login/login-detail.vue'
export default {
  components: {
    LoginDetail
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  .bg-img {
    width: 100%;
    height: 100%;
  }
  .login-mainframe {
    position: absolute;
    margin: auto;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    width: 947px;
    height: 567px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    .mf-left {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
