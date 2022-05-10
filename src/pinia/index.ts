import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist"; //数据持久化

const store = createPinia();
store.use(piniaPluginPersist); //开启数据持久化

export default store;
