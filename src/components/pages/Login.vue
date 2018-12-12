<template>
    <div class="register">
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
      
        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
                :error-message="usernameErrorMsg"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg"
            />
            <div class="register-button">
                <van-button type="primary" size="large" @click="LoginAction" :loading="openLoading">登录</van-button>
            </div>
       </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config";
import { Toast, Tab } from "vant";

export default {
  created() {
    if (localStorage.userInfo) {
      Toast.success("您已经登录");
      this.$router.push("/");
    }
  },
  data() {
    return {
      username: "",
      password: "",
      openLoading: false,
      usernameErrorMsg: "",
      passwordErrorMsg: ""
    };
  },
  methods: {
    LoginAction() {
      // if(checkForm()){
      //     this.axiosRegisterUser()
      // }
      this.checkForm() && this.axiosLoginUser();
    },
    checkForm() {
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
    goBack() {
      this.$router.go(-1);
    },
    axiosLoginUser() {
      this.openLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(response => {
          new Promise((resolve, reject) => {
            //本地存储
            localStorage.userInfo = { userName: this.username };
            setTimeout(() => {
              resolve();
            }, 500);
          })
            .then(() => {
              Toast.success("登录成功");
              this.$router.push("/");
            })
            .catch(err => {
              Toast.fail("登录状态保存失败");
              console.log(err);
            });

          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            Toast.success("登录成功");
            this.$router.push("/");
          } else if (response.data.code == 203) {
            Toast.fail(response.data.message);
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch(error => {
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.register {
  height: 30rem;
}
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-top: 25%;
}
.register-button {
  padding-top: 10px;
}
</style>