import axios from 'axios'

const server = axios.create({
    baseURL:'http://localhost:3000',
    timeout:3000
})


server.interceptors.request.use(function(config){
    let token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = token// 把请求拦截下来，并往请求头中加入token，然后return 
    }
    return config
},function(error){
    console.log(error) // for debug
    return Promise.reject(error)
})

server.interceptors.response.use(function(response){
    const res = response.data
    if(res?.code !== 1){
        console.log(res)
        return res
    }else{
        return res
    }
})

export default server