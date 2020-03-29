<!--
 * @Description: "我的评价" 评价列表组件
 * @Author: Celine
 * @Date: 2019-10-15 09:33:29
 * @LastEditTime: 2019-10-22 09:29:30
 * @LastEditors: Wanlin Chen
 -->
<template>
<div>
  <div class="weui-form-preview">
    <div class="weui-form-preview__hd">
      <div class="weui-form-preview__item">
        <div class="weui-form-preview__label" style="font-weight:bold;color:black">{{evaluateList.cEvaluate.userName}}</div>
        <div class="weui-form-preview__value" style="text-align: right;">{{evaluateList.evaluateTime}}</div>
        <!-- <div
          class="weui-form-preview__value_in-hd"
          style="text-align: left;"
        ></div> -->
      </div>
    </div>
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item">
        <div class="weui-form-preview__label">
          <mp-rate :rateValue="evaluateList.cEvaluate.rate"></mp-rate>
        </div>
        <!-- <div class="weui-form-preview__value">
          
        </div>-->
      </div>
      <div>
        <div class="weui-form-preview__value">{{evaluateList.goodsName}}</div>
      </div> 
      <div class="weui-form-preview__item">
        <!-- <div class="weui-form-preview__label">文字评价</div> -->
        <div class="weui-form-preview__value" style="color:black;font-size:16px">{{evaluateList.cEvaluate.text}}</div>
      </div>
      <!-- <div class="weui-form-preview__item">
 
        <div class="weui-form-preview__value">{{evaluateList.finallytime}}</div>
      </div> -->
      <div class="weui-form-preview__item" style="background-color:	#F0F0F0" v-for="(item,index) in evaluateList.cEvaluate.cEvaluateReplyList" :key="index">
        <div class="weui-form-preview__label" style="font-weight:bold;color:black" v-if="item.type==1">商家回复</div>
        <div class="weui-form-preview__label" style="font-weight:bold;color:black" v-else>用户追评</div>
        <div class="weui-form-preview__value">
          <div>{{item.text}}</div>
          <div style="text-align: right;">{{item.replyDate}}</div>
          <div style="text-align: right;color:blue" @click="onClick(evaluateList.cEvaluate.orderId)" v-if="item.type==1&&userId==evaluateList.cEvaluate.userId">回复</div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-mask" catchtouchmove="preventTouchMove" v-if="showModel"></div>
    <div class="modal-dialog" v-if="showModel">
      <div class="modal-title">请输入回复信息：</div>
      <div class="modal-content">
        <div class="modal-input">
          <input
            placeholder-class="input-holder"
            class="input"
            v-model="res"   
          />
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-cancel" @tap="onCancel" data-status="cancel">取消</div>
        <div class="btn-confirm" @click="onConfirm" data-status="confirm">确定</div>
      </div>
    </div>
</div>
</template>

<script>
import mpRate from "mpvue-weui/src/rate";
export default {
  props: {
    evaluateList: Object
  },
  components: {
    mpRate
  },
  data() {
    return {
      showModel: false,
      res:null,
      id:null,
      userId:null,
    };
  },
  onShow(){
    this.userId=this.$store.state.userId;
  },
  methods: {
    /**评分点击返回分值***/
    rateClick(e) {
      if (this.evaluate.quality != null) {
        this.evaluate.quality = e + 1;
        this.rateValue = this.evaluate.quality;
        console.log(this.evaluate.quality);
      }
    },
    onClick(id) {
      this.showModel = true;
      console.log(this.showModel);
      this.id=id;
    },
    onCancel() {
      this.showModel = false;
    },
    preventTouchMove() {},

    // 对话框确认按钮点击事件
    onConfirm() {
      // console.log("输入完成");
      // console.log(this.res,this.id);
      this.$https
      .request({   
        url: this.$interfaces.addEvaluateReply,
        data: {
          userId: this.$store.state.userId, 
          orderId:this.id,
          text:this.res
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
         this.showModel=false;
      })
      .catch(err => {
        console.log(err);
      });
    },

  }
};
</script>

<style>
/*********评价列表**********/

.weui-form-preview {
  margin-bottom: 10px;
}
.weui-form-preview__value image {
  width: 20px;
  height: 20px;
  float: right;
}
.weui-form-preview__value {
  text-align: left;
}
.weui-form-preview__label.footer {
  border-top: 0.5px solid rgb(209, 208, 208);
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