<template>
  <div class="login-detail">
    <div class="login-frame">
      <p class="login-title">南湖区政治监督评估体系平台</p>

      <div class="input-frame">
        <el-form :model="data" :rules="rules" ref="ruleForm">
          <p class="texts">手机号</p>
          <el-form-item prop="account">
            <el-input
              class="inputs"
              v-model="data.account"
              placeholder="账号"
              @keyup.enter.native="loginAccount('ruleForm')"
            >
            </el-input>
          </el-form-item>

          <p class="texts">密码</p>
          <el-form-item prop="password">
            <el-input
              class="inputs"
              placeholder="密码"
              v-model="data.password"
              show-password
              @keyup.enter.native="loginAccount('ruleForm')"
            >
            </el-input>
          </el-form-item>
          <el-button
            @click="loginAccount('ruleForm')"
            class="login-button"
            type="primary"
          >
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { login } from '@/api/login.js'
export default {
  data () {
    return {
      data: {
        account: '',
        password: ''
      },
      ruleForm: {
        account: ''
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]{11}|admin$/,
            message: '请输入正确的手机格式',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '请输入长度在6-16之间的密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    loginAccount (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const markedPassword = md5(this.data.password)
          login({
            username: this.data.account,
            password: markedPassword // e10adc3949ba59abbe56e057f20f883e
          }).then(res => {
            this.$router.push({
              path: '/home-deduction'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-detail {
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  .login-frame {
    .login-title {
      font-family: MicrosoftYaHei-Bold;
      font-size: 26px;
      color: #1d80cb;
      font-weight: 600;
      margin-bottom: 40px;
    }
    .input-frame {
      position: relative;
      justify-content: center;
      .texts {
        font-size: 20px;
        color: #547395;
        text-align: left;
        margin-bottom: 12px;
      }
      .inputs {
        margin-bottom: 10px;
      }
      .login-button {
        margin-top: 55px;
        width: 100%;
        height: 50px;
        border-radius: 35px;
        background-image: linear-gradient(0deg, #1d9ef0 0%, #55baf5 100%);
        font-size: 25px;
      }
    }
  }
}
</style>
