import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login/login.vue'
import register from '../views/login/register.vue'
import index from '../views/home/index.vue'
import passwordChange from '../views/personal-center/passwordChange.vue'
import personalInfo from '../views/personal-center/personalInfo.vue'
import jobView from '../views/homework/jobView.vue'
import workSubmit from '../views/homework/workSubmit.vue'
import classManage from '../views/manage/classManage.vue'
import teacherManage from '../views/manage/teacherManage.vue'
import studentManage from '../views/manage/studentManage.vue'
import assignWork from '../views/homework/assignWork.vue'
import firstView from '../views/home/firstView.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '',
    name: 'login',
    component: login
  }, {
    path: '/register',
    name: 'register',
    component: register
  }, {
    path: '/index',
    name: 'index',
    component: index,
    children: [{
      path: '/passwordChange',
      name: 'passwordChange',
      component: passwordChange
    }, {
      path: '/firstView',
      name: 'firstView',
      component: firstView
    }, {
      path: '/personalInfo',
      name: 'personalInfo',
      component: personalInfo
    }, {
      path: '/jobView',
      name: 'jobView',
      component: jobView
    }, {
      path: '/workSubmit',
      name: 'workSubmit',
      component: workSubmit
    }, {
      path: '/classManage',
      name: 'classManage',
      component: classManage
    }, {
      path: '/teacherManage',
      name: 'teacherManage',
      component: teacherManage
    }, {
      path: '/studentManage',
      name: 'studentManage',
      component: studentManage
    }, {
      path: '/assignWork',
      name: 'assignWork',
      component: assignWork
    }]
  }]
})
//登录验证
// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token')
//   if (to.meta.requireAuth) {
//     if (token) {
//       next()
//     } else {
//       next({
//         path: login,
//       })
//     }
//   } else {
//     next()
//   }
// })
