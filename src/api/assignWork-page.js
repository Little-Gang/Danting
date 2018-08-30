import {
  http
} from '../utils/index'

//post请求 提交作业信息接口
export function subWorkform(releaseAssignmentDTO) {
  return http.post('ReleaseAssignmentController/releaseAssignment', releaseAssignmentDTO)
}
//post请求 提交上传附件和作业id
export function subWorkfile(data, assignmentId) {
  return http.post(`ReleaseAssignmentController/uploadFile/${assignmentId}`,data)
}
//get请求 查询可选班级
export function getSelectclass(teacherCode) {
  return http.get('ReleaseAssignmentController/findClassByTeacher', {
    params: {
      teacherCode: teacherCode
    }
  })
}

