import server from "@/utils/request";

//登录
export function login(data:{}){
    return server({
        url:'/api/login',
        method:'post',
        data
    })
}
//获取全部用户数据
export function getUserList(){
    return server({
        url:'/getuserlist',
        method:'get',
    })
}

