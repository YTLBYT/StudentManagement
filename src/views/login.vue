<template>
    <div class="top" style="background-color: #EDEDED; height: 100vh;">
        <div class="bottom" style="background-color: #5282FF; height: 60%;">
            <div class="login-form" style="height: 600px; width: 500px;background-color: white">
                <div style="margin-left: 225px; margin-top: 100px">
                    <img src="@/assets/student.png" width="50px" height="50px">
                </div>
                <div style="margin-left: 120px; margin-top: 10px">
                    <b style="font-size: 40px;">学生管理系统</b>
                </div>
                <el-form :model="admin" :rules="rules" ref="loginForm" :hide-required-asterisk="true"
                    style="margin-top: 50px">
                    <el-form-item prop="telephone" style="width: 300px; margin-left: 100px;" class="inputDeep">
                        <el-input v-model="admin.username" placeholder="请输入账号" prefix-icon="el-icon-user"
                            style="border-bottom: 1px solid #ccc;" />
                    </el-form-item>
                    <el-form-item prop="password" style="width: 300px; margin-left: 100px;" class="inputDeep">
                        <el-input type="password" v-model="admin.password" placeholder="请输入密码" prefix-icon="el-icon-lock"
                            style="border-bottom: 1px solid #ccc;" />
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 300px; margin-left: 100px; margin-top: 20px" type="primary"
                            @click="submitForm">登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="margin-top: 300px; display: flex;flex-direction: column;align-items: center;">
            @杨涛 202031061211
        </div>
    </div>
</template>
  
<script>
import request from "@/utils/request";
import Cookies from 'js-cookie'
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            loginAdmin: {},
            admin: {},
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    request({
                        method:'post',
                        url:'http://114.67.241.121:8088/user/login',
                        params:{
                            username: this.admin.username,
                            password: this.admin.password
                        }
                    }
                    ).then(res => {
                            if (res.code === 200) {
                                this.loginAdmin = res.data
                                Cookies.set('admin', JSON.stringify(this.loginAdmin))
                                this.$notify.success("登录成功")
                                this.$router.push('/')
                            } else {
                                this.$notify.error(res.msg)
                            }
                        })
                }
            })
        }
    }
}
</script>
  
<style scoped>
.login-form {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.inputDeep>>>.el-input__inner {
    border: 0;
}
</style>
  