import { createWebHashHistory,createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";

const routes = [
    {path:'/',redirect:{name : 'Login'}},
    {path:'/login',name:'Login',component:Login},
    {path:'/home',name:'Home',component:Home}
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router