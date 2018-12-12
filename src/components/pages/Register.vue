<template>
    <div class="register">
        <van-nav-bar
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
      
        <div class="register-panel" style="opacity:1">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
            <div class="register-button">
                <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
            </div>
       </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config'
import {Toast} from 'vant'
export default {
    data(){
        return{
            username:'',
            password:'',
            openLoading:false,
            usernameErrorMsg:'',
            passwordErrorMsg:''
        }
    },
    methods:{
        registerAction(){
            // if(checkForm()){
            //     this.axiosRegisterUser()
            // }
            this.checkForm()&&this.axiosRegisterUser()
        },
        checkForm(){
            let isOk=true
            if(this.username.length<5){
                this.usernameErrorMsg="用户名不能小于5位"
                isOk= false
            }else{
                this.usernameErrorMsg=''
            }
            if(this.password.length<6){
                this.passwordErrorMsg="密码不能少于6位"
                isOk= false
            }else{
                this.passwordErrorMsg=''
            }
            return isOk
        },
        goBack(){
            this.$router.go(-1)
        },
        axiosRegisterUser(){
            
            axios({
                url:url.registerUser,
                method:'post',
                data:{
                    username:this.username,
                    password:this.password
                }
            })
            .then(response=>{
                console.log(response)
                if (response.data.code==200) {
                    this.$router.push('/')
                    Toast.success('注册成功')
                }else{
                    console.log(response.data.message)
                    Toast.fail('注册失败')
                    this.openLoading=false
                }
                console.log(response.data.code)
            })
            .catch((error)=>{
               
                Toast.fail('注册失败')
                this.openLoading=false
            })
        }
    }
};
</script>

<style scoped>
    .register{
        height: 30rem;
     
    }
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-top:25%;
    }
    .register-button{
        padding-top:10px;
    }
</style>