import server from "@/utils/request";

//获取聊天记录
export function getConversitionList(data:any){
    return server({
        url:'/getconversitionList',
        method:'post',
        data
    })
}
//新增聊天记录
export function addConversitionList(data:any){
    return server({
        url:'/addconversitionList',
        method:'post',
        data
    })
}
//在线的时候新增聊天记录
export function addConversitionListOnline(data:any){
    return server({
        url:'/addconversitionlistOnline',
        method:'post',
        data
    })
}