<template>
  <div class="user">
    <el-menu theme="dark" class="menu header-top-right-menu" mode="horizontal">
      <el-submenu index="1">
        <template slot="title">
          <span class="welcome_dept">{{ userInfo.deptName }}</span
          >,
          <span class="welcome_user">{{ userInfo.username }}</span>
        </template>
        <el-menu-item index="1" @click="viewAccount"
          ><i class="iconfont header-menu-icon icon-1 iconzhanghaoxinxi"></i
          >账号信息</el-menu-item
        >
        <el-menu-item index="2" @click="modifyPass"
          ><i class="iconfont header-menu-icon icon-2 iconmima"></i
          >修改密码</el-menu-item
        >
        <el-menu-item index="3" @click="logoutEvent"
          ><i class="iconfont header-menu-icon icon-3 icontuichu"></i
          >退出</el-menu-item
        >
      </el-submenu>
    </el-menu>
    <div class="img" @click="toMsg">
      <span class="num" v-if="num !== 0">{{ num }}</span>
    </div>
    <v-dialog
      :getdata="userInfo"
      @close="closeDialog"
      :title="title"
      :isShow="dialogShow"
    ></v-dialog>
  </div>
</template>

<script>
import Dialog from './admin-dialog'
export default {
  components: {
    'v-dialog': Dialog
  },
  data () {
    return {
      userInfo: {
        deptName: '',
        username: ''
      },
      num: 0,
      dialogShow: false,
      title: '查看账号'
    }
  },
  mounted () {
    this.getUser()
    this.$bus.off()
    this.$bus.on('fauileSuccess', () => {
      this.getAnnounce(this.userInfo.uuid)
    })
    this.$bus.on('editAccount', () => {
      this.getUser()
    })
  },
  methods: {
    toMsg () {
      this.$router.push('/notice')
    },
    async getUser (param) {
      const { data, status } = await this.$api.userInfo()
      if (status === 200) {
        this.userInfo = data
        this.getAnnounce(data.uuid)
      }
    },
    async getAnnounce (param) {
      const { data, status } = await this.$api.notAnnounce(param)
      if (status === 200) {
        // this.userInfo = data
        this.num = data
      }
    },
    viewAccount () {
      this.title = '查看账号'
      this.dialogShow = true
    },
    closeDialog () {
      this.dialogShow = false
    },
    // 修改密码
    modifyPass () {
      this.title = '修改密码'
      this.dialogShow = true
    },
    // 退出功能
    async logoutEvent () {
      const { status } = await this.$api.goOutLogin()
      if (status === 200) {
        localStorage.removeItem('pageLimitsList')
        location.reload()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  // display: flex;
  // width: 330px;
  justify-content: space-between;
  align-items: center;
  // flex:2;
  width: 400px;
  margin-right: 20px;
  .img {
    // display: inline-block;
    width: 19px;
    height: 22px;
    vertical-align: middle;
    background: url('../../../../../assets/img/tongzhi.png') no-repeat center;
    background-size: 100%;
    position: relative;
    margin-top: 20px;
    cursor: pointer;
    float: right;
    .num {
      position: absolute;
      top: -10px;
      right: -10px;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      border-radius: 50%;
      background: #ff625b;
      height: 20px;
      width: 20px;
      text-align: center;
      line-height: 20px;
    }
  }
  .menu {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #fefefe;
    float: right;
  }
  /deep/ .el-menu {
    background: none;
  }
  /deep/ .el-submenu__title,
  /deep/ .el-submenu__title:hover {
    border-bottom: none !important;
    background: none !important;
    font-size: 18px;
    .welcome_dept {
      color: #fff;
      max-width: 186px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
    }
    .welcome_user {
      max-width: 154px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
    }
    color: #fff !important;
    font-size: 16px;
  }
}
.header-menu-icon {
  font-size: 30px;
  &.icon-1 {
    font-size: 20px;
    margin-right: 10px;
  }
}
.header-top-right-menu {
  // max-width: 338px;
  min-width: 356px;
}
</style>
