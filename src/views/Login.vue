<template>
    <div class="container">
        <div class="login-box">
            <div class="title">tianyi-chat 登录</div>
                <el-form :model="form" label-width="auto" style="max-width: 240px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.id" />
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input
                            v-model="form.password"
                            style="width: 240px"
                            type="password"
                            placeholder="请输入密码"
                            show-password
                        />
                    </el-form-item>
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                </el-form>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue';
import { login } from '../api/user'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main';

const store = useMainStore()
const router = useRouter()
const form = reactive({
    id:'',
    password:''
})

function handleLogin() {
    //router.push('/home')
    if(!form.id || !form.password){
        alert("请输入用户名或密码")
    }else{
        login(form).then((res:any) => {
            if(res?.code !== 0){
                store.userOnlineID = res.user.id
                localStorage.setItem('token',res.token)
                router.push('/home')
            }else{
                alert("用户名或密码错误")
                router.push('/login')
            }
        })
    }
}
</script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    margin-top: 20%;
}
.login-box{
    width: 300px;
    height:270px;
}
.titlt{


}
</style>