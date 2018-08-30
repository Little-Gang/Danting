import { http } from '../utils/index'
//get请求
// export function userLogin(data) {
//     return http.get('LoginController/doRegister', {
//         params: {
//             userCode: data.userCode,
//             password: data.password,
//         }
//     })
// }
//mock假数据
// export function userLogin(data) {
//   return http.get('loginmock', {
//     params: {
//       employeeNumber: data.employeeNumber,
//       password: data.password,
//     }
//   })
// }
//post请求 登录接口
export function userLogin(loginUserDTO) {
    return http.post('LoginController/doRegister', loginUserDTO)
}