<template>
  <div class="headbar">
    <div class="logo-text"><img src="@/assets/new_logo.png" /><span>嘉兴市南湖区发改项目管理系统</span></div>
    <el-menu
      class="nav"
      :default-active="activeMenu"
      :background-color="'#32323a'"
      :text-color="'#ffffff'"
      :unique-opened="false"
      :active-text-color="'#ffffff'"
      :collapse-transition="false"
      mode="horizontal"
    >
      <drop-down-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
    <userinfo></userinfo>
  </div>
</template>

<script>
import DropDownItem from './components/nav/dropdown-item'
import variables from '@/styles/variables.less'
import Userinfo from './components/userinfo/index.vue'
import { setPageLimits } from '@/common/util'
import routes from '@/common/routes'
export default {
  components: { DropDownItem, Userinfo },
  data () {
    return {
      permission_routes: []
    }
  },
  computed: {
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return variables
    },
    pageLimitsList () { // 获取store中的数据
      return this.$store.states.pageLimitsList || JSON.parse(localStorage.getItem('pageLimitsList'))
    }
  },
  created () {
    this.permission_routes = setPageLimits(this.pageLimitsList, routes)
  }
}
</script>
<style lang="less" scoped>
.headbar{
  display: flex;
  align-items: center;
  background: #32323a;
  .logo-text {
    display: inline-flex;
    align-items: center;
    margin-left: 22px;
    margin-right: 20px;
    font-family: MicrosoftYaHei-Bold;
    font-size: 24px;
    font-weight: 700;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #1fb5ad;
    flex: 2;
    img {
      margin-right: 10px;
    }
  }
  .nav{
    flex:5;
  }
  /deep/ .el-menu{
    &.el-menu--horizontal {
      border-bottom: none;
    }
    .menu-wrapper{
      display: inline-block;
      max-width: 200px;
      width: 20%;
      height: 100%;
      .is-active{
        background-color: @default-color!important;
        .el-submenu__title {
          background-color: @default-color!important;
        }
        span{
          color: #fff;
        }
      }
      &:hover {
        .el-menu-item, .el-submenu__title {
          background-color: @default-color!important;
        }
      }
      &:focus {
        outline: none;
        background-color: @default-color;
      }
      .el-submenu__icon-arrow{
        right: 4px;
      }
      .el-submenu__title{
        text-align: center;
        font-family: MicrosoftYaHei;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #95a0aa;
        height: 100%;
      }
    }
  }
  /deep/ .el-submenu__title {
   i.el-submenu__icon-arrow {
     display: none;
   }
  }
}
</style>
