<template>
  <div class="page">
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      :show-close="true"
      :before-close="handleDialogClose"
      width="30%"
    >
    <div class="account" v-if="title==='查看账号'">
      <div class="account_left">
        <span>账号名:</span>
        <span>姓名:</span>
        <span>手机号:</span>
        <span>所属单位:</span>
        <span>角色:</span>
      </div>
      <div class="account_right">
        <span>{{getdata.username}}</span>
        <span>{{getdata.nickName}}</span>
        <span>{{getdata.cellPhone}}</span>
        <span>{{getdata.deptName}}</span>
        <span>{{getdata.roleName}}</span>
      </div>
    </div>
    <div v-else class="pwd">
        <el-form ref="ruleForm" :rules="rules"  :model="ruleForm" label-width="120px">
          <el-form-item label="账号名" prop="username">
            <el-input disabled v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="ruleForm.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="ruleForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="rePassword">
            <el-input type="password" v-model="ruleForm.rePassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')">确认</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { delete } from 'vue/types/umd'
import md5 from 'js-md5'
export default {
  props: ['isShow', 'title', 'getdata'],
  data () {
    return {
      ruleForm: {
        username: '',
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入6-16位的新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度为6-16', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请输入6-16位的新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度为6-16', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    getdata: {
      immediate: true,
      deep: true,
      handler (val) {
        this.ruleForm.username = val.username
      }
    }
  },
  mounted () {
  },
  methods: {
    sure () {
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.newPassword !== this.ruleForm.rePassword) {
            this.$message({
              type: 'error',
              message: '两次输入新密码不一致',
              duration: 1500
            })
          } else if (this.ruleForm.oldPassword === this.ruleForm.newPassword) {
            this.$message({
              type: 'error',
              message: '新密码不能和原密码一致',
              duration: 1500
            })
          } else {
            const param = {
              username: this.ruleForm.username,
              oldPassword: md5(this.ruleForm.oldPassword),
              newPassword: md5(this.ruleForm.newPassword),
              rePassword: md5(this.ruleForm.rePassword)
            }
            this.editPwd(param)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.ruleForm = {}
      this.ruleForm.username = this.getdata.username
      this.$emit('close')
    },
    handleDialogClose (formName) {
      this.resetForm('ruleForm')
    },
    async editPwd (params) {
      const { msgs, status } = await this.$api.changePassword(params)
      // console.log(msgs, status)
      if (status === 200) {
        this.resetForm('ruleForm')
        this.$message({
          type: 'success',
          message: Object.values(msgs)[0],
          duration: 1500
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.account{
  overflow: hidden;
  margin:0 auto;
  width: 80%;
  .account_left{
    width: 36%;
    float: left;
    margin-right: 4%;
    span{
      text-align: right;
      display: block;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      margin-bottom: 40px;
      height: 24px;
    }
  }
  .account_right{
    float: left;
    width: 60%;
    span{
      height: 24px;
      margin-bottom: 40px;
      display: block;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
    }
  }
}
/deep/ .el-dialog {
  border-radius: 10px;
}
/deep/ .el-radio-group {
  margin-top: 10px;
  float: left;
}
/deep/ .el-radio{
  display: block;
  height: 20px;
  line-height: 20px;
  margin-bottom: 20px;
}
.selectbox{
  float: left;
  // display: inline-block;
  /deep/ .el-select{
    display: block;
    margin-bottom: 10px;
  }
}
/deep/.pwd .el-input__inner{
  width: 80%;
}
</style>
