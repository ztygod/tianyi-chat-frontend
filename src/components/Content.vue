<template>
    <div ref="scrollDiv" id="scrollbar" height="665px" class="scrollbar">
        <p v-for="item in store.conversitionList" 
        :key="item.index" 
        >
            <div v-if="item.senderID !== store.userOnlineID" class="scrollbar-demo-item-right">
                <el-avatar class="avatar-left" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                {{ item.content }}
            </div>
            <div v-else class="scrollbar-demo-item-left">
                {{ item.content }}
                <el-avatar class="avatar-right" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
            </div>
        </p>
    </div>

</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/main';
import { nextTick, onMounted, onUpdated, ref ,watch,watchEffect} from 'vue';
const store = useMainStore()

const scrollDiv = ref()

watch(store.conversitionList,() => {
    nextTick(() => {
        const content = scrollDiv.value
        content.scrollTo({ top: content.scrollHeight, behavior: "smooth" })
    })
})
</script>


<style scoped>
.scrollbar{
    background: var(--el-color-primary-light-9);
}
.scrollbar-demo-item-right {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 40px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
.scrollbar-demo-item-left{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 40px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
.avatar-left{
    margin-right: 10px;
}
.avatar-right{
    margin-left: 10px;
}
</style>