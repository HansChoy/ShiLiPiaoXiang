 <!--
 * @Description: 订单列表界面
 * @Author: Wanlin Chen
 * @Date: 2019-10-09 11:02:29
 * @LastEditTime: 2019-10-31 16:22:53
 * @LastEditors: Wanlin Chen
 -->

<template>
  <div class="order">
    <div class="page">
      <div class="page__bd">
        <div class="weui-tab">
          <div class="weui-navbar">
            <block v-for="(item,index) in tabs" :key="index">
              <div
                :id="index"
                :class="['weui-navbar__item', activeIndex === index ? 'weui-bar__item_on' : '']"
                @click="tabClick"
              >
                <div class="weui-navbar__title">{{item}}</div>
              </div>
            </block>
          </div>
          <div class="weui-tab__panel">
            <div class="weui-tab__content" :hidden="activeIndex != 0">
              <orderCell
                v-for="(item,index) in allOrderList"
                :key="index"
                :index ="index"
                :allOrderList ="item"
                @isDelete ="isDelete"
                @isComplete ="isComplete"
              ></orderCell>
            </div>
            <div class="weui-tab__content" :hidden="activeIndex != 1">
              <orderCell
                v-for="(item,index) in allOrderList"
                :key ="index"
                :index ="index"
                :allOrderList ="item"
                @isComplete ="isComplete"
              ></orderCell>
            </div>
            <div class="weui-tab__content" :hidden="activeIndex != 2">
              <div v-for="(item,index) in allOrderList" :key="index">
                <orderCell :orderId="item.id"  :allOrderList="item"></orderCell>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{'hide':isHide,'tips':istips}">没有该状态的订单哦！</div>
    <div class="modal-mask" catchtouchmove="preventTouchMove" v-if="showModel"></div>
    <div class="modal-dialog" v-if="showModel">
      <div class="modal-title">提示</div>
      <div class="modal-content">
        <div text-algin="center">您还未登录,是否前往登录?</div>
      </div>
      <div class="modal-footer">
        <div class="btn-cancel" @tap="onCancel" data-status="cancel">取消</div>
        <div class="btn-confirm" @click="onConfirm" data-status="confirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import orderCell from "../../components/orderCell/index";
import mpNavbar from "mpvue-weui/src/navbar";


export default {
  data() {
    return {
      tabs: ["待取餐", "待评价", "已完成"],
      activeIndex: 0,
      allOrderList: [],
      state: 2,//首页展示状态初始化
      isHide: true, //提示是否存在
      istips: true ,//提示的状态绑定
      showModel:false
    };
  },
  components: {
    orderCell,
    mpNavbar,
  },
  onShow() {
    if(this.$store.state.haveLogin!=true){
       this.showModel=true;
    }else {
    console.log("成功加载");
    this.isHide = true;
    this.$https
      .request({
        url: this.$interfaces.showOrderPreview,
        data: {
          state: this.activeIndex+1,
          userId: this.$store.state.userId
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        method: "POST"
      })
      .then(res => {
        console.log(res);
        // 成功，刷新页面
        this.allOrderList = res.data;
        if (this.allOrderList.length == 0) {
          this.isHide = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  methods: {
    tabClick(e) {
      this.isHide = true;
      console.log(e);
      this.activeIndex = Number(e.currentTarget.id);
      this.$https
        .request({
          url: this.$interfaces.showOrderPreview,
          data: {
            state: this.activeIndex+1,
            userId: this.$store.state.userId
          },
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "POST"
        })
        .then(res => {
          // 成功，刷新页面
          this.allOrderList = res.data;
          console.log(this.allOrderList);
          if (this.allOrderList.length == 0) {
            this.isHide = false;
            console.log(this.isHide);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onCancel() {
      this.showModel = false;
      wx.switchTab({
        url: "../home/main"
      });
    },
    preventTouchMove() {},
    // 对话框确认按钮点击事件
    onConfirm() {
      wx.navigateTo({
            url: "../login/main"
      });
      this.showModel=false;
    },
    isDelete(e,index){
      console.log("取消订单");
      var timestamp = (new Date()).getTime();
      console.log(timestamp,index,this.allOrderList)
      if(timestamp-this.allOrderList[index].cOrder.ordertime>180){
        wx.showToast({
          title: "下单时间已超3分钟，不能取消订单，如有需要，请联系商家",
          icon: "none",
          duration: 2000
        });
      }
      // this.$https
      //   .request({
      //     url: this.$interfaces.cancelOrder,
      //     data: {
      //       id: e
      //     },
      //     header: {
      //       "content-type": "application/json" // 默认值
      //     },
      //     method: "POST"
      //   })
      //   .then(res => {
      // //成功，再次向后端发起请求，从第index位开始，删除一个元素
      //   this.allOrderList.splice(index, 1);
      //   if (this.allOrderList.length == 0) {
      //       this.isHide = false;
      //       console.log(this.isHide);
      //     }
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    },
    isComplete(e,index){
      console.log("确认完成订单");
      this.$https
        .request({
          url: this.$interfaces.updateOrderState,
          data: {
            orderid: e
          },
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "POST"
        })
        .then(res => {
      //成功，再次向后端发起请求，从第index位开始，删除一个元素
        this.allOrderList.splice(index, 1);
        if (this.allOrderList.length == 0) {
          this.isHide = false;
          console.log(this.isHide);
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
  }
};
</script>

<style>
.page,
.page__bd {
  height: 100%;
  margin-top: 0px;
}
.page__bd {
  padding-bottom: 0;
}
.weui-navbar{
  background-color: white;
}
.weui-navbar__title {
  display: block;
  
}
.tips {
  color: slategrey;
  margin: 300rpx 0 0 250rpx;
}
.hide {
  display: none;
}
/* 模态框格式 */
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modal-dialog {
  width: 540rpx;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 9999;
  background: #f9f9f9;
  margin: -180rpx 105rpx;
  border-radius: 36rpx;
}
.modal-title {
  padding-top: 50rpx;
  font-size: 36rpx;
  color: #030303;
  text-align: center;
}
.modal-content {
  padding: 50rpx 32rpx;
}
.modal-input {
  display: flex;
  background: #fff;
  border: 2rpx solid #ddd;
  border-radius: 4rpx;
  font-size: 28rpx;
}
.input {
  width: 100%;
  height: 82rpx;
  font-size: 28rpx;
  line-height: 28rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  color: #333;
}
input-holder {
  color: #666;
  font-size: 28rpx;
}
.modal-footer {
  display: flex;
  flex-direction: row;
  height: 86rpx;
  border-top: 1px solid #dedede;
  font-size: 34rpx;
  line-height: 86rpx;
}
.btn-cancel {
  width: 50%;
  color: #666;
  text-align: center;
  border-right: 1px solid #dedede;
}
.btn-confirm {
  width: 50%;
  color: #0ebb1d;
  text-align: center;
}
</style>