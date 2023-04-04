<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <!--    侧边栏-->
        <el-aside :width="asidewidth + 'px'" style="background-color: rgb(238, 241, 246);height:100%;">
            <el-menu style="min-height: 100%; overflow-x: hidden;" :collapse-transition="false" :collapse="isCollapse"
                :default-active="$route.path" router>
                <div style="line-height:80px; background-color: #5282FF; text-align: center; height: 80px;">
                    <img src="../assets/student2.png" alt="" width="30px"
                        style="margin-right: 5px; position: relative; top: 8px">
                    <b style="color: white;" v-show="!isCollapse">学生管理系统</b>
                </div>
                <el-submenu index="student">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span style="margin-left: 8px">学生管理</span>
                    </template>
                    <el-menu-item index="/listStudent">
                        <i class="el-icon-user"></i>
                        <span slot="title">学生列表</span>
                    </el-menu-item>
                    <el-menu-item index="/addStudent">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span slot="title">学生新增</span>
                    </el-menu-item>

                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <!--      头部-->
            <el-header
                style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 80px; display: flex; height: 80px">
                <div style="flex: 1; font-size: 25px">
                    <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
                </div>
            </el-header>

            <!--      主体-->
            <el-main tyle="flex: 1; width: 0; background-color: white; padding: 10px">
                <router-view />
            </el-main>
        </el-container>

    </el-container>
</template>
  
  
  
  
<script>
import Cookies from 'js-cookie'

export default {
    name: 'Layout.vue',
    data() {
        return {
            admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
            input: '',
            collapseBtnClass: 'el-icon-s-fold',
            isCollapse: false,
            asidewidth: 200
        }
    },
    methods: {
        collapse() {
            this.isCollapse = !this.isCollapse
            if (this.isCollapse) {
                this.asidewidth = 64
                this.collapseBtnClass = 'el-icon-s-unfold'
            } else {
                this.asidewidth = 200
                this.collapseBtnClass = 'el-icon-s-fold'
            }
        },
        rowStyle() {
            return "text-align:center";
        },
        logout() {
            // 清除浏览器用户数据
            Cookies.remove('admin')
            this.$router.push('/login')
        }
    }
}
</script>
  
<style>

</style>