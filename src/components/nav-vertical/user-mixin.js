import modelChangePassword from './model-change-password.vue'
import modelUserInfo from './model-info.vue'
import { mapState } from 'vuex'
export default {
  components: {
    'model-info': modelUserInfo,
    'model-change-password': modelChangePassword
  },
  data () {
    return {
      // 展示用户信息
      displayUserInfo: false,
      // 展示修改密码窗口
      displayPassword: false
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo.user
    })
  },
  methods: {
    // 打开修改密码面板
    changePassword () {
      this.displayPassword = true
    },
    closeModel () {
      this.displayPassword = false
    },
    // 打开用户信息面板
    userInfoView () {
      this.displayUserInfo = true
    }
  }
}
