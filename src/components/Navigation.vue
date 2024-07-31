<template>
    <div class="container">
        <div class="img">
            <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="40" height="40" />
        </div>
        <div class="title">
            <h3>tianyi chat</h3>
        </div>
        <div class="info">
            <el-switch
            class="switch"
            v-model="store.isCollapse"
            size="large"
            active-text="折叠"
            inactive-text="侧边展开"
            />
        </div>
        <div class="action">
            <el-button type="danger" @click="loginOut">Delete</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '@/stores/main';
import { ElMessageBox } from 'element-plus'
import { useRoute,useRouter } from 'vue-router';

const store = useMainStore()
const router = useRouter()


function loginOut(){
    router.push('/login')
}
</script>


<style scoped>
.container{
    position: fixed;
    display: flex;
    align-items:center;
    width: 100%;
    height: 70px;
    border: 1px solid #dcdfe6;
    border-top-width: 0;
    border-right-width: 0;
    border-left-width: 0;
    z-index: 2;
}
.logo{
}
.title{
    width: 105px;
    margin-left: 5px;
    margin-right: 5px;
}
.info{
    margin-left: 1180px;
}
.action{
    margin-left: 50px;
}
</style>