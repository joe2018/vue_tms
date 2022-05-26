import axios from 'axios'
import {router} from '@/router'
import qs from 'qs'
import api from "@/axios/index";

// 创建axios实例
const Lrequest = axios.create({
    baseURL: 'http://localhost:8081/',
    timeout: 1000,
})

// 2.请求拦截器
Lrequest.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    if (config.method.toLowerCase() === 'get') { // 配置get请求数据(这里是容错处理)
        if (config.data !== undefined) config.params = config.data
    }
    // 防止post请求，后端无法接收参数问题（方式一）
    if (config.method.toLowerCase() === 'post') { // post请求配置数据转换和请求头
        config.data = qs.stringify(config.data) // 数据转化,也可以使用qs转换
    }
    return config
}, error => {
    Promise.reject(error)
})

export default Lrequest
