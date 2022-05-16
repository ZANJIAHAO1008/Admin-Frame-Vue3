import { defineStore } from "pinia";
import { ElConfig } from "@/types/layout";
interface State extends Partial<ElConfig> {}

export const useConfigStore = defineStore({
  id: "config_974813758", // id必填，且需要唯
  persist: {
    enabled: true, // 开启数据缓存
  },
  state: (): State => {
    return {
      language: undefined,
      componentSize: undefined,
    };
  },
  actions: {},
});
