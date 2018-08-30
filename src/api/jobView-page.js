import {
  http
} from '../utils/index'
//get请求 根据学生作业id查看学生作业详情
export function checkAssignment(studentAssignmentId) {
  return http.get('/CheckAssignmentController/checkAssignment', {
    params: {
      studentAssignmentId: studentAssignmentId || undefined
    }
  })
}

//get请求 下载学生作业附件
export function downstudentFile(fileName) {
  return http.get('/CheckAssignmentController/downloadFile', {
    params: {
      fileName: fileName || undefined
    }
  })
}

//get请求 根据老师代码获取作业代码和作业名称list
export function getListbytechid(page, size, teacherCode) {
  return http.get('/CheckAssignmentController/getAssignmentList', {
    params: {
      page: page || undefined,
      size: size || undefined,
      teacherCode: teacherCode || undefined
    }
  })
}
//get请求 根据作业Id查找相关学生作业List
export function getListbyworkid(page, size, assignmentId) {
  return http.get('/CheckAssignmentController/getStudentAssignmentList', {
    params: {
      page: page || undefined,
      size: size || undefined,
      assignmentId: assignmentId || undefined
    }
  })
}
//get请求 给学生作业打分
export function gradeWork(score, studentAssignmentId) {
  return http.get(`/CheckAssignmentController/markStudentAssignment/${score}/${studentAssignmentId}`)
}
