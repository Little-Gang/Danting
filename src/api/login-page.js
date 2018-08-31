import { http } from '../utils/index'

//post请求 登录接口
export function userLogin(loginUserDTO) {
    return http.post('LoginController/doRegister', loginUserDTO)
}