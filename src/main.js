import {createApp} from 'vue'
import App from './App.vue'
import { router } from "./router"
import store, {setupStore} from './store'
import * as ElIcons from '@element-plus/icons'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import dayjs from 'dayjs'

// 导入全局样式
import './assets/css/global.css'

const app = createApp(App)
for (const name in ElIcons) {
    app.component(name, (ElIcons)[name])
}
//路由钩子权限
import "@/utils/permission"

window.router = router

// require('./mock')

setupStore(app)
app.use(ElementPlus)
app.use(store).use(router).mount('#app')

// 添加全局日期过滤器vue3.0的写法
app.config.globalProperties.$filters = {
    format(value) {
        if (value) {
            return dayjs(value).format('YYYY-MM-DD hh:mm:ss')
        } else {
            return ''
        }
    }
}
