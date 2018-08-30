import {
  http
} from '../utils/index'

//get请求 组合条件查询班级接口
export function selectClass(page, size, grade, subject) {
  return http.get('/ClassManageController/findByCondition', {
    params: {
      page: page || undefined, //非空判断
      size: size || undefined,
      grade: grade || undefined,
      subject: subject || undefined
    }
  })
}

//post请求 新增班级接口
export function addClass(form) {
  return http.post('/ClassManageController/addClass', form)
}

//post请求 批量导入班级
export function addClassesByEx(form) {
  return http.post('/ClassManageController/saveClassByExcel', form)
}

//post请求 删除班级
export function delateClass(id) {
  return http.get('/ClassManageController/deleteClass', {
    params: {
      id: id
    }
  })
}

//post请求 编辑班级信息接口
export function editClass(form) {
  return http.post('/ClassManageController/updateClassInfo', form)
}

//post请求 查询老师接口
export function selectTeacher(form) {
  return http.post('/TeacherManageController/findByCondition', form)
}

//post请求 新增老师接口
export function addTeacher(form) {
  return http.post('/TeacherManageController/saveTeacher', form)
}

//post请求 批量导入老师
export function addTeachersByEx(form) {
  return http.post('/TeacherManageController/saveTeacherByExcel', form)
}

//post请求 编辑老师接口
export function editTeacher(form) {
  return http.post('/TeacherManageController/updateTeacherInfo', form)
}

//get请求 删除老师接口
export function delateTeacher(userCode) {
  return http.get(`/TeacherManageController/deleteTeacher/${userCode}`)
}

//delate请求 删除学生接口
export function delateStudent(userCode) {
  return http.delete('/StudentManageController/deleteStudent/'+userCode)
}

//post请求 查询学生接口
export function selectStudent(form) {
  return http.post('/StudentManageController/findByCondition', form)
}

//post请求 新增学生接口
export function addStudent(form) {
  return http.post('/StudentManageController/saveStudent', form)
}

//post请求 批量导入学生
export function addStudentsByEx(form) {
  return http.post('/StudentManageController/saveStudentByExcel', form)
}

//post请求 编辑学生信息接口
export function editStudent(form) {
  return http.post('/StudentManageController/updateStudentInfo', form)
}

//Get请求 获取下一个用户id
export function getNextUserId() {
  return http.get('/UserCommonController/nextCode',)
}

