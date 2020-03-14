<!--
 * @Author: 赵新朋
 * @Date: 2020-03-12 10:31:42
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-12 14:35:15
 * @Description: 
 -->
<template>
  <div class="login-box">
    <div class="login">
      <div class="head">
        <div class="logo">
          <img src="@/assets/images/LOGOa.png" alt>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">关于树人</el-menu-item>
            <el-menu-item index="3">业务介绍</el-menu-item>
            <el-menu-item index="4"><a href="" target="_blank">联系我们</a></el-menu-item>
            <el-menu-item index="5">企业登录</el-menu-item>
          </el-menu>
        </div>
      </div>

      <!-- 登录表单区域 -->
      <div class="loginForm">
        <img class="loginImg" src="@/assets/images/login.png" alt="">
        <div class="loginForminput">
          <div class="login-container">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
              <h1 style="color:#9ab734;margin-top:-40px;margin-bottom:50px">注册</h1>
              <el-form-item prop="loginName">
                <el-input
                  ref="loginName"
                  v-model="loginForm.loginName"
                  placeholder="手机号"
                  name="loginName"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
                <span class="svg-container">
                  <img src="@/assets/images/phone.png" alt="">
                </span>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="密码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
                <span class="svg-container">
                  <img src="@/assets/images/password.png" alt="">
                </span>
              </el-form-item>
              <el-form-item class="captchpass" prop="captch">
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.captch"
                  type="text"
                  placeholder="验证码"
                  name="Captch"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
                <el-button :loading="loading" type="primary" :disabled="btn" @click="send">
                  <span v-show="show">获取验证码</span>
                  <span v-show="!show" class="count">{{ count }} </span>
                </el-button>
              </el-form-item>
              <div class="tips">
                <el-button :loading="loading" type="primary" style="width:26%;margin-bottom:30px" @click.native.prevent="handleLogin">注册</el-button>
                <p>已有账号？去<router-link to="/login">登录</router-link></p>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btn: false,
      show: true, // 初始启用按钮
      count: '', // 初始化次数
      timer: null,
      active: 2,
      word: false,
      captch: true,
      activeIndex: '5',
      activeIndex2: '2',
      rule: true,
      loginForm: {
        loginName: '',
        password: '',
        captch: ''
      },
      loginRules: {
        loginName: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{4,16}$/,
          message: '请输入长度为4-16位的数字字母汉字组合,'

        }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'

        }, {
          pattern: /^[\da-zA-Z_]{6,12}$/,
          message: '请输入长度为6-12位的数字字母下划线组合'

        }],
        captch: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'

        }, {
          pattern: /^[\d]{6,6}$/,
          message: '请输入长度为6位的数字验证码'

        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  methods: {
    send() {
      const TIME_COUNT = 60 // 更改倒计时时间
      this.btn = true
      this.$store.dispatch('user/registerCaptch', this.loginForm.loginName).then(() => {
        console.log
      })
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            this.btn = false
            clearInterval(this.timer) // 清除定时器
            this.timer = null
          }
        }, 1000)
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/register', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/login' })
            this.loading = false
          }).catch(() => {
            this.loading = false
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
<style lang="scss">
$bg:#fff;
$light_gray:#000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border-bottom: 1px solid #c3c3c3;
  }
  .el-form-item__content{
    display: flex;
  }
}
.el-menu{
    border: none;
  }
</style>
<style lang="scss">
.login-box{
	height: 100%;
	width: 100%;
	background-size: cover;
	.login {
		.head {
			text-align: center;
			.logo{
        display: flex;
        justify-content:space-between;
				margin-bottom: 20px;
			}
		}
	}
  .loginForm{
    width: 100%;
    display: flex;
    .loginImg{
      display: block;
      width: 50vw;
      height: 100vh;
    }
    .loginForminput{
      width: 50vw;
      height: 100vh;
       .tabpane{
         float: right;
         margin-right: 20px;
         height: 40px;
         width: 240px;
         display: flex;
         border:1px solid #c3c3c3;
         border-radius: 20px;

       }
       .login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    width: 100%;
    font-size: 14px;
    color: #c3c3c3;
    margin-bottom: 10px;
    display: flex;
   margin-top:30px;
    p {
      margin-left: 20px;
      a {
        color: #9ab734;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    img{
      width: 20px;
    }
  }

  .title-container {
    float: right;
    height: 38px;
    width: 240px;
    display: flex;
    color: #c3c3c3;
    position: fixed;
    top:200px;
    right:150px;
    border-radius: 20px;
    margin-bottom: 10px;
    border: 1px solid #c3c3c3;
    background-color: #fff;
    .activeColor{
      color: #fff;
      background-color: #8ab743;
    }
    p{
      line-height:38px;
        width: 120px;
        text-align: center;
        color: #c3c3c3;
        font-size: 16px;
        margin:0;
      }
    p:nth-child(1){
      border-top-left-radius: 21px;
      border-bottom-left-radius: 20px;
    }
    p:nth-child(2){
      border-top-right-radius: 21px;
      border-bottom-right-radius: 20px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}
    }
  }
	.com-info{
		position: relative;
		bottom: 5%;
		left:0;
		width: 100%;
		font-size: 0.85em;
		color: #555;
		text-align: center;
	}
}

</style>
