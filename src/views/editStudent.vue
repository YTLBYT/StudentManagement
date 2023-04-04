<template>
    <div style="width: 80%">
      <div style="margin-top: 30px">
        <el-form :inline="true" :model="form" label-width="100px">
          <el-form-item label="姓名" prop="stuname">
            <el-input v-model="form.stuname" placeholder="请输入学生姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="stationAddress">
            <el-input v-model="form.stugender" placeholder="请输入性别"></el-input>
          </el-form-item>
          <el-form-item label="住址" prop="stuaddess">
            <el-input v-model="form.stuaddess" placeholder="请输入住址"></el-input>
          </el-form-item>
          <el-form-item label="籍贯" prop="stunative">
            <el-input v-model="form.stunative" placeholder="请输入籍贯"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="stuphone">
            <el-input v-model="form.stuphone" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="stuno">
            <el-input v-model="form.stuno" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="stugrade">
            <el-input v-model="form.stugrade" placeholder="请输入年级"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="stumajor">
            <el-input v-model="form.stumajor" placeholder="请输入专业"></el-input>
          </el-form-item>
        </el-form>
      </div>
  
      <div style="text-align: center; margin-top: 30px">
        <el-button type="primary" @click="save()" size="medium">提交</el-button>
      </div>
    </div>
  </template>
  
  <script>
import request from "@/utils/request";
import Cookies from 'js-cookie';

  export default {
    name: 'AddStation',
    data() {
      return {
        form: {},
      }
    },
    created(){
      this.form = JSON.parse(Cookies.get('currentStudent'));
      Cookies.remove('currentStudent')
    },
    methods: {
      save() {
        request({
        method: 'post',
        url: 'http://114.67.241.121:8088/stu/edit',
        data:{
            stuname: this.form.stuname,
            stugender: this.form.stugender,
            stuaddess: this.form.stuaddress,
            stunative: this.form.stunative,
            stuphone: this.form.stuphone,
            stuno: this.form.stuno,
            stuid: this.form.stuid,
            stugrade: this.form.stugrade,
            stumajor: this.form.stumajor
        }
      }
      ).then(res => {
        if (res.code === 200) {
          this.$notify.success("修改成功")
          this.$router.push('/listStudent')
        } else {
          this.$notify.error(res.msg)
        }
      })
      },
    }
  }
  
  </script>
  
  