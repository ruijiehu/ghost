<template>
  <div v-if="!item.meta.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" /> -->
          <img v-if="(item.meta.title==='通知公告')||(item.meta.title==='上报管理')" class="noDropImg" :src="item.meta.title==='通知公告'?require('../../../../../assets/img/nav2.png'):item.meta.title==='上报管理'?require('../../../../../assets/img/nav4.png'):''" alt="">
          <!-- <item :title="onlyOneChild.meta.title" /> -->
          <span class="noDropTit">{{onlyOneChild.meta.title}}</span>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu class="manage-menu" v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item :icon="icons(item)" v-if="item.meta" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.name"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/common/validate'
import Item from './Item'
import AppLink from './link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    icons (val) {
      const type = val.meta.title
      // eslint-disable-next-line no-unused-vars
      let srctype
      switch (type) {
        case '项目信息':
          srctype = 1
          break
        case '通知公告':
          srctype = 2
          break
        case '统计汇总':
          srctype = 3
          break
        case '上报管理':
          srctype = 4
          break
        case '平台管理':
          srctype = 5
          break
        default:
          srctype = ''
          break
      }
      return srctype
    },
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        if (parent.meta.alwaysLink) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        }
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0 || parent.meta.alwaysLink) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang="less">
.el-menu--horizontal{
  height: 58px;
  ul{
    height: 58px;
    margin-top: 0;
    padding: 0
  }
  li{
      height: 100%;
      float: left;
      width: 100%;
    }
}
.nest-menu .router-link-active .el-menu-item{
  background-color: @default-color!important;
}
.nest-menu .el-menu-item {
  height: 60px!important;
  line-height: 60px!important;
  &:hover {
    background-color: @default-color!important;
  }
}
.nest-menu .el-menu-item span{
  text-align: center;
  display: block;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  font-family: MicrosoftYaHei;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  // color: #32323a;
  color: #fff;
}

.submenu-title-noDropdown{
  text-align: center;
}
.noDropImg{
  margin-top: 3px;
  display:inline-block;
}
.noDropTit{
  margin-left: 10px;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #95a0aa;
  color: #fff;
  margin-top: 1px;
  display:inline-block;
}
</style>
