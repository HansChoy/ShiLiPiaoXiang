<!--
 * @Description: 我的评价
 * @Author: Celine
 * @Date: 2019-10-14 09:03:52
 * @LastEditTime: 2019-11-04 09:45:10
 * @LastEditors: Lin Changkun
 -->

<template>
  <div class="evaluate">
    <div class="user_info" style="background:url('/static/images/pingjiabeijing.png')">
      <!-- 用户信息 -->
      <img src="/static/images/logo.jpg" alt />
      <div class="user_detail">
        <h4>十里飘香</h4>
        <span style="color:black">已贡献{{length}}条数据</span>
      </div>
    </div>
    <!-- 评价列表 -->
    <div class="eva_list">
      <div v-for="(item,index) in evaluateList" :key="index">
        <evaluateCell
          :evaluateList="item"
        ></evaluateCell>        
      </div>

    </div>
  </div>
</template>

<script>
import evaluateCell from "../../components/evaluateCell/index";
export default {
  components: {
    evaluateCell
  },
  data() {
    return {
      length: Number, ////统计该用户评价表数据库中有多少条数据
      evaluateList:[]
    };
  }, 
  onShow() {
    console.log("成功加载");        
    this.$https
      .request({   
        url: this.$interfaces.showEvaluate,
        data: {
          userId: this.$store.state.userId, 
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        method: "POST"
      })
      .then(res => {
        // 成功，刷新页面
        this.evaluateList = res.data;
        this.length = this.evaluateList.length;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    swithToOrder: function() {
      console.log(123);
      wx.navigateBack({
        delta: 1 // 回退前 delta(默认为1) 页面
      });
    }
  }
};
</script>

<style>
/*抬头用户信息 */
.user_info {
  height: 30%;
  width: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.user_info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
}
.user_detail h4 {
  margin: 20rpx 24rpx 0rpx;
}
.user_detail span {
  color: #aaa;
  font-size: 14px;
}
</style>