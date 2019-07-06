<template>
  <div class="login">
    <h1 class="logo"><a href="http://www.lta-av.com" title="莱拓智能科技"></a></h1>
    <div class="content">
      <h2 class="title">登  录</h2>
      <div class="cipher">
        <div class="item">
          <div class="item-content">
            <span class="iconfont icon-yonghu"></span>
            <div class="item-input">
              <input type="text" class="input" v-model.trim="userName" placeholder="请输账号">
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-content">
            <span class="iconfont icon-mima"></span>
            <div class="item-input">
              <input type="password" class="input" v-model.trim="userPwd" @keyup.enter.native= "enterEvent" placeholder="请输密码">
            </div>
          </div>
        </div>
        <div class="other">
          <el-checkbox v-model="checked" class="left save">记住密码</el-checkbox>
          <a href="javascript:void(0);" class="right switch blue" @click="skipFindPwd">忘记密码</a>
        </div>
        <div class="login-btn">
          <el-button @click="verifyLogin">登  录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default{
  data () {
    return {
      userName: '',
      userPwd: '',
      checked: false
    }
  },
  created () {

  },
  mounted () {
    // 获取账号
    const userName = localStorage.getItem('ltLoginUserName') || ''
    this.userName = userName
    // 获取密码
    const userPwd = localStorage.getItem('ltLoginUserPwd') || ''
    // 获取记住密码状态
    const state = localStorage.getItem('ltSaveUserPwdState')
    if (state === '1') {
      this.checked = true
      this.userPwd = userPwd
    } else {
      this.checked = false
      this.userPwd = ''
    }
  },
  methods: {
    // 回车
    enterEvent () {
      // 验证用户名
      let userName = this.userName
      if (!userName) {
        this.$message({
          showClose: true,
          message: '请输入用户名!',
          type: 'warning'
        })
        return
      }
      // 验证密码
      let userPwd = this.userPwd
      if (!userPwd) {
        this.$message({
          showClose: true,
          message: '请输入密码!',
          type: 'warning'
        })
        return
      }
      this.loginSkip()
    },
    // 点击登录
    verifyLogin () {
      // 验证用户名
      let userName = this.userName
      if (!userName) {
        this.$message({
          showClose: true,
          message: '请输入用户名!',
          type: 'warning'
        })
        return
      }
      // 验证密码
      let userPwd = this.userPwd
      if (!userPwd) {
        this.$message({
          showClose: true,
          message: '请输入密码!',
          type: 'warning'
        })
        return
      }
      this.loginSkip()
    },
    // 登录跳转
    loginSkip () {
      let params = {
        User_Name: md5(this.userName),
        User_Password: md5(this.userPwd)
      }
      params = this.$qs.stringify(params)
      this.$axios({
        method: 'post',
        url: this.reqApi() + '/user/doLogin',
        data: params
      }).then((res) => {
        if (res.data.resultCode === '0') {
          // 保存账号
          let userName = this.userName
          localStorage.setItem('ltLoginUserName', userName)
          // 保存密码
          if (this.checked) {
            localStorage.setItem('ltSaveUserPwdState', '1')
            let userPwd = this.userPwd
            localStorage.setItem('ltLoginUserPwd', userPwd)
          } else {
            localStorage.setItem('ltSaveUserPwdState', '0')
            localStorage.setItem('ltLoginUserPwd', '')
          }
          console.log(res.data.resultBody)
          this.$message({
            message: '恭喜你，登录成功！',
            type: 'success'
          })
        } else {
          const errHint = res.data.resultMsg
          this.$message({
            message: errHint,
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '服务器连接失败！',
          type: 'error'
        })
      })
    },
    // 找回密码
    skipFindPwd () {

    }
  }
}
</script>

<style lang="less" scoped>
  .login{
    width: 100%;
    height: 100%;
    background: url("../assets/images/login_bg.jpg")no-repeat center top;
    background-size:cover;
    .logo {
      width: 242px;
      height: 58px;
      position: fixed;
      left: 100px;
      top:50px;
      background: url("../assets/images/logo.png") no-repeat;
    }
    .content{
      width: 400px;
      height: 360px;
      padding: 20px 30px 0;
      border-radius: 6px;
      position: fixed;
      left: 50%;
      top: 50%;
      transform:translate(-50%, -50%);
      background:#FFF;
      .title{
        height: 60px;
        text-align: center;
        font-size: 24px;
        color:#333;
      }
      .cipher{
        .item{
          padding-bottom: 30px;
          .item-content{
            position: relative;
            height: 40px;
            .iconfont{
              position: absolute;
              width: 60px;
              height: 100%;
              left: 0;
              top: 0;
              background: #4fa5f2;
              border-radius: 6px;
              line-height: 40px;
              text-align: center;
              font-size: 24px;
              color: #ffffff;
            }
            .item-input{
              height: 100%;
              padding-left: 60px;
              background: #eaeef2;
              border-radius: 6px;
              .input{
                display: block;
                width: 100%;
                height: 100%;
                padding-left: 6px;
                font-size: 14px;
                color: #272727;
                border: none;
                background: transparent;
                -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
              }
            }
          }
        }
        .other{
          height: 60px;
          color: #272727;
          .switch{
            font-size: 14px;
          }
        }
        .login-btn{
          height: 40px;
          .el-button{
            display: block;
            width: 100%;
            height: 100%;
            background: #4fa5f2;
            color: #ffffff;
            font-size: 16px;
            border: none;
            border-radius: 20px;
          }
        }
      }
    }
  }
</style>
