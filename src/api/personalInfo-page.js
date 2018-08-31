import { http } from '../utils/index'

//post请求 修改用户信息接口
export function userChangeinfo(Form) {
    return http.post('PersonalInfoManageController/updateUserInfo', Form)
}
//post请求 修改用户密码接口
export function userChangepass(Form){
    return http.post('PersonalInfoManageController/changePassword',Form)
}
//Get请求 根据code获取用户信息
export function getUserInfo(userCode){
  return http.get(`/UserCommonController/getUserInfo/${userCode}`)
}
