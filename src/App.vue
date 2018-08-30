<template>
  <div id="app">
    <router-view></router-view> <!-- 最高级路由入口，最高级的路由页面将在这里显示 -->
  </div>
</template>

<script>
import student from './components/student-tree.vue'
import teacher from './components/teacher-tree.vue'
import admin from './components/admin-tree.vue'
export default {
  name: 'App',
  components: {
    student,
    teacher,
    admin
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  padding: 0%
}
.el-button{
  text-align: center  
}
</style>
