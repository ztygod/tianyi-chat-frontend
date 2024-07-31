import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserList } from '@/api/user'
import type User from '@/types/user'
import type Message from '@/types/message'
import type Chatpeople from '@/types/chatPeople'
import { getConversitionList } from '@/api/content'

export const useMainStore = defineStore('main',{
    state:() => {
        return {
            //用户列表数据
            UserLists: [] as User[],
            //用户列表是否折叠
            isCollapse: false, 
            //用户列表宽度
            userListWidth:0,
            //当前在线玩家ID
            userOnlineID:0,
            //聊天记录
            conversitionList:[] as Message[],
            //聊天双方
            chatPeople:{} as any,
            //socket实例
            socket:{} as any
        }
    },
    actions:{
        //初始化用户列表
        initUserList(){
            getUserList().then((res:any) => {
                if(res?.code === 1){
                    this.UserLists= res.simple_reslut
                }else{
                    console.log('用户列表为空，请管理员添加用户')
                }
            })
        },
        //改变侧边栏折叠状态
        changeIsCollapse(){
            this.isCollapse = !this.isCollapse
        },
        //初始化聊天界面
        initChatContent(){
            getConversitionList(this.chatPeople).then((res:any) => {
                if(res.code !== 0){
                    this.conversitionList = res.simple_reslut
                }else{
                    // alert("聊天记录为空，请开始你的聊天之旅")
                    this.conversitionList = []
                }
            })
        },
        //利用socket实时向对方发送消息
        sendMsg(conversitionList : any){
            // let receiverID = conversitionList.people.receiver.id
            // let senderID = conversitionList.people.sender.id
            let people = conversitionList.people
            let content = conversitionList.content
            let sendTime = conversitionList.sendTime

            let data = {
                people,
                sendTime,
                content
            }
            if(this.socket){
                this.socket.emit('sendMsg',data)
            }
        }
    },
    persist:true
})