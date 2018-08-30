import { http } from '../utils/index'
//get请求 修改用户信息接口
// export function userChangeinfo(params) {
//     return http.get('PersonalInfoManageController/updateUserInfo', {
//         userCode: params.userCode,
//         name:params.name,
//         sex	:params.sex,
//         age	:params.age,
//         phone:params.phone,
//         email:params.email,
//         address:params.address
//     })
// }
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
