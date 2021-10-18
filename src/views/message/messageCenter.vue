<template>
  <div class="messageCenter">
    <el-container class="defult-h">
      <el-aside width="200px">
        <ul class="category_body">
          <li
            v-for="item in categoryList"
            :key="item.id"
            :class="
              storageCategory && storageCategory.id === item.id
                ? 'category_list category_list_click'
                : 'category_list'
            "
            @click="changeCategory(item)"
          >
            <el-badge
              :value="item.unread"
              :type="item.type ? item.type : 'error'"
            >
              {{ item.name }}
            </el-badge>
          </li>
        </ul>
      </el-aside>
      <el-container>
        <el-header
          ><span>{{
            storageCategory ? storageCategory.name : "暂未选择"
          }}</span>
          <i class="fa fa-refresh" title="刷新" @click="getInfo"></i
        ></el-header>
        <el-main v-loading="loading">
          <ul v-if="messageList.length" class="message_body">
            <li v-for="item in messageList" :key="item.id" class="message_list">
              <div class="message_b_nav">
                <span class="message_b_n_t" :title="item.title">{{
                  item.title
                }}</span>
                <span class="message_b_n_d">{{ item.Date }}</span>
              </div>
              <span class="message_b_content" :title="item.content">{{
                item.content
              }}</span>
            </li>
          </ul>
          <img
            v-else
            class="abnormal-img min-w600 min-h500"
            src="/src/assets/image/unmessage.svg"
            alt=""
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { defineComponent, toRefs, reactive, onMounted } from "vue";
export default defineComponent({
  name: "messageCenter",
  setup() {
    const state = reactive({
      categoryList: [
        {
          name: "回复我的",
          id: "0",
          unread: 0,
        },
        {
          name: "我的消息",
          id: "1",
          unread: 12,
        },
        {
          name: "@我的",
          id: "2",
          unread: 108,
        },
        {
          name: "系统通知",
          id: "3",
          unread: "new",
          type: "primary",
        },
      ],
      messageList: [],
      storageCategory: null,
      loading: false,
    });

    onMounted(() => {
      state.storageCategory = state.categoryList[3];
      getInfo();
    });

    const getInfo = () => {
      //查询消息列表
      state.loading = true;
      state.messageList = [];
      setTimeout(() => {
        if (state?.storageCategory?.unread === "new") {
          state.messageList.push(
            ...[
              {
                id: "0",
                Date: "2021/10/18",
                title: "张恒帮郑爽偷逃税被罚三千多万",
                content:
                  "张恒作为郑爽参演《倩女幽魂》的经纪人，负责相关演艺合同签订、片酬商谈等事宜，帮助郑爽逃避履行纳税义务，税务部门依法对张恒处以在《倩女幽魂》中偷税额（4302.7万元）0.75倍的罚款，计3227万元。",
              },
              {
                id: "1",
                Date: "2021/10/18",
                title: "外媒炒作中国试射导弹 外交部回应",
                content:
                  "【环球时报-环球网报道 记者 乌元春】英国《金融时报》近日援引多名消息人士的话称，中国试射了一枚携带高超音速滑翔飞行器的火箭，并判断它是可携带核弹头的高超音速导弹。《金融时报》宣称，这种导弹可以在绕地球低轨道飞行，并可让美国的导弹防御体系失效，那些防御体系都是针对有着固定抛物线轨迹的弹道导弹设计的。报道称，中国军方的进展让美国情报部门感到“措手不及”。在10月18日的外交部例行记者会上，发言人赵立坚被问及这个问题。",
              },
              {
                id: "2",
                Date: "2021/10/18",
                title: "泉州酒店坍塌致29死 一审20人获刑",
                content:
                  "2020年3月7日，位于泉州市鲤城区常泰街道上村社区南环路1688号的欣佳酒店所在建筑物发生坍塌事故，坍塌的建筑物系泉州市新星机电工贸有限公司综合楼，因长期违法违规建设、改建和加固施工导致坍塌，造成29人死亡、50人不同程度受伤，直接经济损失5794万元。",
              },
            ]
          );
        }
        state.loading = false;
      }, 800);
    };

    const changeCategory = (item) => {
      //选中类别
      state.storageCategory = item;
      getInfo();
    };

    return {
      ...toRefs(state),
      changeCategory,
      getInfo,
    };
  },
});
</script>
<style lang="scss" scoped>
.messageCenter {
  .category_body {
    height: 100%;
    padding: 12px 0;
    box-sizing: border-box;
    .category_list {
      padding: 15px 25px 15px 5px;
      font-size: 16px;
      cursor: pointer;
      font-weight: 600;
      text-align: center;
    }
    .category_list_click {
      color: rgb(64, 158, 255);
    }
    .category_list :hover {
      color: rgb(64, 158, 255);
    }
  }
  .el-aside,
  .el-header,
  .el-main {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .el-header {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    border-radius: 7px 7px 0 0;
    display: flex;
    align-items: center;
  }
  .fa-refresh {
    padding-left: 12px;
    cursor: pointer;
  }
  .fa-refresh:hover {
    color: rgb(64, 158, 255);
  }
  .el-header,
  .el-main {
    margin-left: 10px;
  }
  .el-main {
    margin-top: 10px;
    .message_body {
      .message_list {
        margin-top: 18px;
        cursor: pointer;
        list-style: none;
        padding: 24px 12px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        .message_b_nav {
          display: flex;
          align-items: center;
          .message_b_n_t {
            font-size: 15px;
            font-weight: 600;
            width: 250px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .message_b_n_d {
            padding-left: 12px;
            font-size: 15px;
            color: #999;
          }
        }
        .message_b_content {
          padding: 12px 12px 0 12px;
          line-height: 24px;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
      .message_list:first-child {
        margin-top: 0px;
      }
    }
  }
}
</style>
