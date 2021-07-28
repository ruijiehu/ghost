<style>
.change-password .el-dialog__body {
  padding-right: 20px;
}
.change-password .password-frame {
  width: 100%;
  height: 400px;
  border: none;
}
</style>
<template>
  <div class="change-password">
    <el-dialog
      class="model-password"
      :close-on-click-modal="false"
      title="修改密码"
      :visible.sync="display"
      top="5%"
      :before-close="onClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input type="password" v-model="form.rePassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import swal from 'sweetalert2'
import md5 from 'js-md5'
import { changePassword } from '@/api/user/account'
export default {
  name: 'change-password',
  props: ['display', 'url', 'id'],
  data () {
    const validatePass = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        newPassword: '',
        rePassword: '',
        oldPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位的密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位的密码', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位的密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    display () {
      if (this.display === false) {
        this.$refs.form.resetFields()
      }
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    },
    changePassword () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const formCopy = JSON.parse(JSON.stringify(this.form))
          formCopy.oldPassword = md5(formCopy.oldPassword)
          formCopy.newPassword = md5(formCopy.newPassword)
          delete formCopy.rePassword
          changePassword(formCopy)
            .then(res => {
              if (res.status === 200 && res.success === true) {
                swal.fire({
                  type: 'success',
                  title: '修改密码成功'
                })
                this.$emit('close')
              } else {
                const message = res.msgs
                swal.fire({
                  type: 'error',
                  title: message[Object.keys(message)[0]]
                })
              }
            })
            .catch(error => {
              swal.fire({
                type: 'error',
                title: error.msgs[Object.keys(error.msgs)[0]]
              })
            })
        }
      })
    }
  }
}
</script>
<style>
.swal2-container {
}
</style>
