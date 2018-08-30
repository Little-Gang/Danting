//createdBy QiaoGang 2017-1-19
<template>
  <el-container class="pageIndex">
    <el-header>
      <div class="header">
        <div class="header-title">{{username}}现在是{{time}}</div>
        <div class="header-button-group">
          <el-button class="btn" type="danger" @click="toLogin()">退出登录</el-button>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <student v-if="this.student" /><br>
        <teacher v-if="this.teacher" /><br>
        <admin v-if="this.admin" />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import student from '../../components/student-tree.vue';
import teacher from '../../components/teacher-tree.vue';
import admin from '../../components/admin-tree.vue';
export default {
  name: 'index',
  data() {
    return {
      time: '',
      username: '',
      roleid: '',
      student: false,
      admin: false,
      teacher: false
    };
  },
  components: {
    student,
    teacher,
    admin
  },
  methods:{
    toLogin(){
      this.$confirm('确认退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push({
            name: 'login'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
            showClose: true
          });
        });
    }
  },
  created() {
    var newuserInfo = localStorage.getItem('userInfo'); //从本地取得用户信息并转换为json形式
    var userinfo = JSON.parse(newuserInfo);
    this.username = userinfo.data.userEO.name;
    this.roleid = userinfo.data.roleId;
    switch (this.roleid) {
      case 1:
        this.admin = true;
        break;
      case 2:
        this.teacher = true;
        break;
      case 3:
        this.student = true;
        break;
    }
  },
  mounted() {
    setInterval(() => {
      this.time = new Date().toLocaleString();
    }, 1000);
  }
};
</script>
<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pageIndex {
  height: 600px;
  width: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: 100%;
}
.el-button{
  text-align: center;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>