import {
  http
} from '../utils/index'

//post请求 根据条件查找相关作业接口
export function selectHomework(form) {
  return http.post('StudentAssignmentController/findByCondition', form)
}

//get请求  下载作业附件接口
export function downloadFile(assignmentId) {
  return http.get('/StudentAssignmentController/downloadFile', {
    params: {
      assignmentId: assignmentId
    }
  })
}

//post请求 上传附件接口
export function uploadFile(file,studentAssignmentId) {
  return http.post(`/StudentAssignmentController/uploadFile/${studentAssignmentId}`, file)
}

//post请求 提交答案接口
export function submitAnswer(form) {
  return http.post('/StudentAssignmentController/submitAnswer', form)
}

//get请求 查看作业详情接口
export function viewDetail(assignmentId) {
  return http.get('/StudentAssignmentController/viewDetail', {
    params: {
      assignmentId: assignmentId
    }
  })
}
