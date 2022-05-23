import { defineStore } from "pinia";
import { BaseInfoState } from "@/types/setting";
interface State {
  user: Partial<BaseInfoState["baseInfoForm"]>;
}

export const useUserStore = defineStore({
  id: "user_974813758", // id必填，且需要唯一
  persist: {
    enabled: true, // 开启数据缓存
    strategies: [
      {
        key: "user_974813758",
        storage: localStorage,
      },
    ],
  },
  state: (): State => {
    return {
      user: {}, //用户信息
    };
  },
  actions: {},
});
