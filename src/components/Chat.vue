<template>
    <div class="middle">
        <Navigation></Navigation>
        <div></div>
    </div>
    <div class="main"> 
        <User></User>
        <Domain class="domain"></Domain>
    </div>
</template>

<script setup lang="ts">
import User from './User.vue';
import Navigation from './Navigation.vue';
import Domain from './Domain.vue';
import { io } from 'socket.io-client';
import { useMainStore } from '@/stores/main';
import { onMounted } from 'vue';
import { addConversitionList, addConversitionListOnline } from '@/api/content';

onMounted(() => {
    initSocket()
})

const store = useMainStore()

function initSocket(){
    store.socket = io("http://localhost:3000")
    store.socket.on('connect',() => {
        console.log("连接成功")
        store.socket.emit('online',store.userOnlineID)
    })
    store.socket.on('receiveMsg',(data : any) => {
        store.initChatContent()
        // addConversitionListOnline(data).then((res: any) => {
        //     if(res.code !== 0){
        //         store.initChatContent()
        //     }else{
        //         alert("请重新操作")
        //     }
        // })
    })
}
</script>


<style scoped>
.main{
    display: flex;
}
/* .domain{
    flex:1;
} */
.middle{
    width: 1637px;
    height: 71px;
}
</style>
