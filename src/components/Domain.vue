<template>
    <div class="common-layout" id="container" :style="dynamicStyles">
    <el-container>
      <el-container>
        <el-main class="main" :style="mainStyles">
            <Content></Content>
        </el-main>
        <el-footer class="footer" :style="footerStyles">
            <Editor></Editor>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, reactive, watch } from 'vue';
import Content from './Content.vue';
import Editor from './Editor.vue';
import { useMainStore } from '@/stores/main';

const store = useMainStore()
//好像经过两次响应式后，就不再随时更新
// const dyNum = computed(() =>{
//     return store.isCollapse
// })
const dynamicStyles :any = computed(() => {
    return {
        marginLeft: store.isCollapse ? '65px' : '250px'
    }
})
const mainStyles :any = computed(() => {
    return {
        width:store.isCollapse ? '1615px' : '1430px'
    }
})
const footerStyles = computed(() => {
    return {
        width:store.isCollapse ? '1615px' : '1430px'
    }
})
</script>

<style scoped>
.main{
    padding: 0;
    height: 665px;
    border: 1px solid #dcdfe6
}
.footer{
    padding: 0;
    height: 200px;
    border: 1px solid #dcdfe6
}
.common-layout{
    position: fixed;
}
</style>