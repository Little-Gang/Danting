import axios from 'axios'
import router from '../router/index'
import store from '../store/index'
import * as types from '../store/types'

const http = axios.create({
    baseURL: '/api/',
    // timeout: 1000,
    // headers: { 'Content-Type': 'application/json' },
})

// 设置拦截器，直接获取response的data数据
http.interceptors.response.use(response => {
    return response.data
})

export default http