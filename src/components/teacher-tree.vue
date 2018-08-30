//createdBy QiaoGang 2017-1-19
<template>
  <el-row>
    <el-col :span="12">
      <el-menu class="menu" default-active="2" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>个人中心</span>
          </template>
          <el-menu-item-group>
            <router-link to="/personalInfo">
              <el-menu-item index="1-1">信息管理</el-menu-item>
            </router-link>
            <router-link to="/passwordChange">
              <el-menu-item index="1-2">修改密码</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>作业管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/assignWork">
              <el-menu-item index="2-1">发布作业</el-menu-item>
            </router-link>
            <router-link to="/jobView">
              <el-menu-item index="2-1">查收作业</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'teacher',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
.teacher_tree{
    width: 30%
}
.teacher_col{
    width: 70%
}
.el-submenu__title {
    font-size: 14px;
    color: #303133;
    width: 200px;
    box-sizing: border-box;
}
.el-menu {
  list-style: none;
  border: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #d3dce6;
}
</style>