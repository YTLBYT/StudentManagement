<template>
  <div>
    <el-main>
      <div class="div1" style="padding: 10px 0;">
        <el-button type="primary" icon="el-icon-circle-plus-outline" style="float: right"
          @click="$router.push('/addStudent')">添加</el-button>
      </div>
      <el-table :data="tableData" :cell-style="rowStyle" stripe row-key="stuid" default-expand-all>
        <el-table-column prop="stuid" label="学生id" width="80" align="center"></el-table-column>
        <el-table-column prop="stuno" label="学号" align="center"></el-table-column>
        <el-table-column prop="stuname" label="姓名" align="center"></el-table-column>
        <el-table-column prop="stumajor" label="专业" align="center"></el-table-column>
        <el-table-column prop="stugender" label="性别" align="center"></el-table-column>
        <el-table-column prop="stugrade" label="年级" align="center"></el-table-column>
        <el-table-column prop="stuphone" label="电话" align="center"></el-table-column>
        <el-table-column prop="stuaddess" label="住址" align="center"></el-table-column>
        <el-table-column prop="stunative" label="籍贯" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template v-slot="scope">
            <el-button type="primary" @click="editStudent(scope.row)">编辑</el-button>
            <el-popconfirm style="margin-left: 5px" title="您确定删除这行数据吗？" @confirm="del(scope.row.stuid)">
              <el-button type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import request from '@/utils/request'
import Cookies from 'js-cookie';

export default {
  name: 'HomeView',
  data() {
    return {
      tableData: [],
      form: {},
      addFormVisible: false,
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request({
        method: 'get',
        url: 'http://114.67.241.121:8088/stu/list',
      }
      ).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        } else {
          this.$notify.error(res.msg)
        }
      })
    },

    del(stuid) {
      request({
        method: 'post',
        url: 'http://114.67.241.121:8088/stu/del',
        params: {
          stuid: stuid
        }
      }
      ).then(res => {
        if (res.code === 200) {
          this.$notify.success("删除成功")
          this.load()
        } else {
          this.$notify.error(res.msg)
        }
      })
    },

    editStudent(student){
      Cookies.set('currentStudent', JSON.stringify(student))
      this.$router.push('/editStudent')
    },

    rowStyle() {
      return "text-align:center";
    },
  }
}
</script>

<style scoped>
.div1 {
  border-bottom: 1px solid #eee;
  height: 70px;
}
</style>>