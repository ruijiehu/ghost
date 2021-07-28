<template>
  <el-container class="wrapper">
    <el-header class="header">
      <div class="header-title" @click="toIndex">
        <img :src="require('@/assets/img/logo.png')" />
        <span>Ghost - 前端模版</span>
      </div>
      <div class="header-user">
        <el-avatar :size="30" icon="el-icon-user-solid"></el-avatar>
        <el-menu class="menu" mode="horizontal">
          <el-submenu index="1">
            <template slot="title">
              <span class="welcome">{{ nickName }}</span>
            </template>
            <el-menu-item index="" @click="userInfoView"
              ><i class="el-icon-document"></i>用户信息</el-menu-item
            >
            <el-menu-item index="" @click="changePassword"
              ><i class="el-icon-edit"></i>修改密码</el-menu-item
            >
            <el-menu-item index="" @click="logOut"
              ><i class="el-icon-upload2"></i>退出</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu :default-active="activeIndex" class="nav-menu" :router="true">
          <template v-for="(c, index) in $router.options.routes[0].children">
            <el-menu-item
              v-if="
                !c.children &&
                  !c.meta.hideOnMenu &&
                  rights.includes(c.meta.right)
              "
              :key="index"
              :index="'/' + c.path"
              :data-index="'/' + c.path"
              >{{ c.meta.title }}
            </el-menu-item>
          </template>
          <template v-for="(b, index) in $router.options.routes[0].children">
            <el-submenu
              v-if="b.children && rights.includes(b.meta.right)"
              :key="index"
              :index="'/' + b.path"
              :data-index="'/' + b.path"
            >
              <template slot="title">
                {{ b.meta.title }}
              </template>
              <template v-for="(i, subIndex) in b.children">
                <el-menu-item
                  v-if="!i.meta.hideOnMenu && rights.includes(i.meta.right)"
                  :key="subIndex"
                  :index="'/' + b.path + '/' + i.path"
                  :data-index="'/' + b.path + '/' + i.path"
                  >{{ i.meta.title }}</el-menu-item
                >
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="main-content">
        <div class="bread-crumb" v-if="currRoute.meta.bc">
          <el-breadcrumb separator="/">
            <template v-for="(item, index) in currRoute.meta.bc">
              <el-breadcrumb-item :key="index" :to="{ name: item }">
                {{ item }}
              </el-breadcrumb-item>
            </template>
            <el-breadcrumb-item>
              {{ currRoute.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="background: #fff">
          <router-view />
        </div>
      </el-main>
      <model-info
        :display="displayUserInfo"
        :userInfo="userInfo"
        @close="displayUserInfo = false"
      >
      </model-info>
      <model-change-password :display="displayPassword" @close="closeModel">
      </model-change-password>
    </el-container>
  </el-container>
</template>
<script>
import store from '@/store'
import userMixin from './user-mixin'
export default {
  name: 'NavWrapper',
  data () {
    return {
      activeIndex: '',
      elmainpadding: '20px'
    }
  },
  mixins: [userMixin],
  methods: {
    logOut () {
      this.$router.push({
        name: 'login'
      })
      store.commit('clearUserInfo')
    },
    toIndex () {
      this.$router.push('/home')
    },
    // 获取用户密码被修改次数,如果一次都没修改过，则需要显示修改密码弹窗
    async getPwdUpdateCount () {
      // const { data } = await pwdUpdateCount()
      // if (!data || data === 0) {
      //   this.displayPassword = true
      // }
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.activeIndex = val.path
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    currRoute: function () {
      return this.$route
    },
    nickName: function () {
      return (
        store.state.userInfo.user && (store.state.userInfo.user.nickName || '')
      )
    },
    rights: function () {
      return store.state.permission
    }
  },
  mounted () {
    console.log(this.$route)
    this.getPwdUpdateCount()
  }
}
</script>

<style scoped lang="less">
.wrapper {
  background-color: #ecf1f9;
  min-width: 1440px;
  .nav-menu {
    text-align: left;
    height: calc(~'100vh - 60px');
  }
  .aside {
    z-index: 22;
    .el-menu-item {
      font-size: 18px;
    }
    /deep/ .el-submenu {
      .el-submenu__title {
        font-size: 18px;
      }
      .el-menu-item {
        font-size: 16px;
        color: #767676;
        &.is-active {
          color: #1d80cb;
        }
      }
    }
  }
  .header {
    width: 100%;
    z-index: 20;
    padding: 0;
    background-color: #fff;
    display: flex;
    box-shadow: 0 1px 5px 1px rgb(185, 185, 185);
    justify-content: space-between;
    padding: 0 25px;
    height: 60px;
    .header-title {
      font-family: MicrosoftYaHei;
      font-size: 22px;
      line-height: 60px;
      letter-spacing: 1px;
      color: #1d80cb;
      cursor: pointer;
      > span {
        margin-left: 20px;
      }
    }
    .header-user {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    /deep/ .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
      border-bottom: none;
    }
  }
  .main-content {
    max-height: calc(~'100vh - 60px');
    width: 1240px;
    padding: 20px;
  }
  .bread-crumb {
    padding: 20px 0 20px 20px;
    background: #fff;
    position: relative;
    font-size: 16px;
    &::after {
      position: absolute;
      bottom: 5px;
      left: 50%;
      content: '';
      display: block;
      width: 100%;
      transform: translate(-50%, 0);
      background: rgb(209, 209, 209);
      height: 1px;
    }
  }
}
</style>
