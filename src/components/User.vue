<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="store.isCollapse"
    @open="handleOpen"
    @close="handleClose"
    :default-openeds="[userOnlineInfo?.index]"
  >  
    <el-sub-menu :index="userOnlineInfo?.index">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>当前用户</span>
      </template>
      <el-menu-item-group>
        <template #title><span>当前用户名</span></template>
        <el-menu-item :index="`${userOnlineInfo?.index} + '-1'`">{{ userOnlineInfo?.name }}</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>头像</span></template>
        <el-menu-item :index="`${userOnlineInfo?.index} + '-2'`">
          <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>年龄</span></template>
        <el-menu-item :index="`${userOnlineInfo?.index} + '-3'`">{{ userOnlineInfo?.age }}</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>居住地</span></template>
        <el-menu-item :index="`${userOnlineInfo?.index} + '-4'`">{{userOnlineInfo?.location }}</el-menu-item>
      </el-menu-item-group>
       <el-menu-item-group>
        <template #title><span>个性签名</span></template>
        <el-menu-item :index="`${userOnlineInfo?.index} + '-5'`">{{ userOnlineInfo?.signature }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="45">
          <el-icon><Setting /></el-icon>
          <span>好友列表</span>
    </el-menu-item>
    <el-sub-menu 
      v-for="userList in friendInfo" 
      :index="userList.index"
      >
      <template #title>
        <el-icon><User /></el-icon>
        <span>{{ userList.name }}</span>
      </template>
      <el-menu-item-group>
        <template #title><span>聊天</span></template>
        <el-menu-item :index="`${userList.index} + '-0'`" @click="handleChat(userList)">
          点击开始聊天
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>头像</span></template>
        <el-menu-item :index="`${userList.index} + '-1'`">
          <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>用户名</span></template>
        <el-menu-item :index="`${userList.index} + '-2'`">{{ userList.name}}</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>年龄</span></template>
        <el-menu-item :index="`${userList.index} + '-3'`">{{ userList.age }}</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template #title><span>居住地</span></template>
        <el-menu-item :index="`${userList.index} + '-4'`">{{ userList.location }}</el-menu-item>
      </el-menu-item-group>
       <el-menu-item-group>
        <template #title><span>个性签名</span></template>
        <el-menu-item :index="`${userList.index} + '-5'`">{{ userList.signature }}</el-menu-item>
      </el-menu-item-group>
       <el-menu-item-group>
        <template #title><span>最后在线时间</span></template>
        <el-menu-item :index="`${userList.index} + '-6'`">{{ new Date(userList.last_online).toLocaleString() }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useMainStore } from '@/stores/main';
import {
    User,
    Setting
} from '@element-plus/icons-vue'
import type Usertype from '@/types/user';

onMounted(() =>{
  initUserLists()
})

const store = useMainStore()
const value = ref(true)
//获得用户列表
function initUserLists(){
  store.initUserList()
}
//获取正在通信的双方
function handleChat(userList :Usertype){
  store.chatPeople = {
    sender:userOnlineInfo,
    receiver:userList
  }
  store.initChatContent()
}
//当前用户信息
const userOnlineInfo= computed(() => {
  return store.UserLists.find((item) => item.id === store.userOnlineID)
})
//好友信息
const friendInfo = computed(() => {
  return store.UserLists.filter((item) => item.id !== store.userOnlineID)
})

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>


<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 100%;
}
</style>