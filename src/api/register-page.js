import { http } from '../utils/index'
//get请求 传用户名与验证码给后台
export function userChangepass(params) {
    return http.get('FindPasswordController/validateValidationCode', {
        params: params
    })
}
//get请求 传用户名给后台
export function getChecknum(userCode) {
    return http.get('FindPasswordController/sendValidationCode',{
        params: {
            userCode: userCode
        }
    })
}