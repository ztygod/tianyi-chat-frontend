import { createPinia } from 'pinia'
// 引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)
// 导出
export default store

