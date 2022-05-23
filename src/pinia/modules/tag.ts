import { defineStore } from "pinia";
import { Tag } from "@/types/layout";

interface State {
  tagsList: Tag[];
  MAX_TAG_LENGTH: number;
  collapse: boolean;
  BLACK_LIST: string[];
}

export const useTagStore = defineStore({
  id: "tag_974813758", // id必填，且需要唯
  persist: {
    enabled: true, // 开启数据缓存
    strategies: [
      {
        key:'tag_974813758',
        storage: localStorage,
      },
    ],
  },
  state: (): State => {
    return {
      tagsList: [], //tag标签存储
      MAX_TAG_LENGTH: 10, //标签最大显示长度
      collapse: false, //侧边栏展开关闭
      BLACK_LIST: [
        //无需保存的黑名单
        "/login",
        "/global/abnormal/404",
        "/global/abnormal/403",
        "/global/abnormal/build",
        "/global/abnormal/networkError",
      ],
    };
  },
  actions: {
    setTags<T extends Tag>(tag: T) {
      //选中在tagsList添加菜单
      this.tagsList.push(tag);
    },
    delTags<T extends { index: number }>({ index }: T) {
      //如果标签到10个再选择就将最初的删除
      this.tagsList.splice(index, 1);
    },
    delRightMenu<T extends { WHITE_TAGS_LIST: string[] }>({
      WHITE_TAGS_LIST,
    }: T) {
      //关闭tag的右菜单
      const tagList: Tag[] = [];
      this.tagsList.forEach((tags, index) => {
        if (WHITE_TAGS_LIST?.includes(tags.path)) {
          tagList.push(tags);
        }
      });
      this.tagsList = [...tagList];
    },
  },
});
