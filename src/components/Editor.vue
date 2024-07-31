<template>
    <div class="container">
        <el-input
        class="input"
        v-model="textarea"
        :style="inputStyle"
        :rows="10"
        type="textarea"
        placeholder="Please input"
        />
        <el-button type="primary" style="height: 200px;" @click="sendMessage(conversition)">点击发送</el-button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main';
import { addConversitionList } from '@/api/content';

const store = useMainStore()
const textarea = ref('')
const conversition = computed(() => {
    return {
        people:store.chatPeople,
        content:textarea.value
    }
})
function sendMessage(conversition : any){
    if(textarea.value !== ''){
        textarea.value = ''
        const conversitionList = {
            ...conversition,
            sendTime:getNowTime()
        }
        //向数据库中添加聊天记录，同时也可以看作接受者不在线的代码逻辑
        addConversitionList(conversitionList).then((res:any) => {
            if(res.code !== 0){
                store.initChatContent()
            }else{
                alert("请重新操作")
            }
        })
        //向在线用户发送消息
        store.sendMsg(conversitionList)
        store.initChatContent()
    }else{
        alert("发送消息不能为空")
    }
}
// 在不足两位数的数字前补零
function padZero(num:any) {
  return num < 10 ? `0${num}` : num;
}
// 确保毫秒部分是六位数，不足的补零
function padMilliseconds(ms:any) {
  if (ms < 10) {
    return `00${ms}`;
  } else if (ms < 100) {
    return `0${ms}`;
  } else {
    return ms.toString();
  }
}
//得到当前时间，格式类似2024-07-30 14:57:21.000000
function getNowTime(){
    let currentDate = new Date();
    // 使用 Date 对象的方法获取年、月、日、时、分、秒和毫秒
    let year = currentDate.getFullYear();
    let month = padZero(currentDate.getMonth() + 1); // getMonth 返回的是 0 到 11，所以要加 1
    let day = padZero(currentDate.getDate());
    let hours = padZero(currentDate.getHours());
    let minutes = padZero(currentDate.getMinutes());
    let seconds = padZero(currentDate.getSeconds());
    let milliseconds = padMilliseconds(currentDate.getMilliseconds()); // 获取毫秒，并确保是六位数

    // 拼接成所需格式的时间字符串
    let formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    return formattedTime
}

const inputStyle = computed(() => {
    return {
        width:store.isCollapse ? '1528px' : '1343px'
    }
        
})
</script>


<style scoped>
.container{
    display: flex;
}
.input{
    padding: 0;
}
</style>