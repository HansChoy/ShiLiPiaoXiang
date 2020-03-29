<!--
 * @Description: “购物车”界面
 * @Author: Hans
 * @Date: 2019-1-28 17:28:28
 * @LastEditTime: 2019-11-03 10:50:50
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="shoppingCart">
    <scroll-view scroll-y="true" style="height: 1000rpx;">
      <van-swipe-cell v-for="good in items" :key="good.item" right-width="60">
        <van-card
          :num="good.num"
          :tag="good.tag"
          :price="good.price"
          :desc="good.desc"
          :title="good.title"
          :thumb="good.thumb"
          :origin-price="good.originPrice"
          @clickThumb="onClickThumb(good.id)"
        >
          <div slot="tags" v-if="good.ifsale==1">
            <van-tag plain type="danger">限购{{good.tagNum}}件</van-tag>
          </div>
          <div slot="footer">
            <van-icon name="icon/sub.png" size="50rpx" @click="subGoods(good.id,index)" v-if="good.num!==0" />
            <div class="goodSpan">
              <span v-if="good.num!==0">{{good.num}}</span>
            </div>
            <van-icon
              name="icon/add.png"
              size="50rpx"
              @click="addGoods(good.id,index)"
            />
          </div>
        </van-card>
        <van-button slot="right" square text="删除" type="danger" class="delete-button" @click="deleteGoods(good.id,index)">删除</van-button>
      </van-swipe-cell>
    </scroll-view>
    <van-submit-bar :price="price*100" button-text="结算" @submit="onSubmit">
      <van-goods-action-icon icon="delete" text="清空" @click="onClick" v-if="total===0" />
      <van-goods-action-icon icon="delete" text="清空" @click="onClick" :info="total" v-else />
    </van-submit-bar>
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
export default {
  data() {
    return {
      mainActiveIndex: 0,
      activeId: null,
      number: 0,
      value: 0,
      show: false,
      items: [],
      price: 0.0,
      total: 0,
      showModel:false,
    };
  },
  onShow() {
    // if(this.$store.state.serviceDetail!=null){
    //   this.mainActiveIndex=this.$store.state.serviceDetail;
    // }
    if(this.$store.state.haveLogin!=true){
      this.showModel=true;
    }
    if (this.$store.state.haveLogin == true) {
      console.log(this.$store.state.cartId);
      this.$https
        .request({
          url: this.$interfaces.commitCartGoods,
          data: {
            cartId: this.$store.state.cartId
          },
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "POST"
        })
        .then(res => {
          console.log(res);
          this.items = res.data.goods;
          this.price = res.data.price;
          this.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    onClickThumb(id) {
      this.$store.dispatch("setGoodId",id);
      wx.navigateTo({
        url: "../goodsDetail/main"
      });
    },
    onClickIcon() {
      this.show = true;
      console.log(this.show);
    },
    onClick() {
      this.$https
        .request({
          url: this.$interfaces.deleteCartGoods,
          data: {
            cartId: this.$store.state.cartId
          },
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "POST"
        })
        .then(res => {
          wx.showToast({
                title: "清空成功",
                icon: "none",
                duration: 2000
          });
          this.items=null;
          this.price=0.0;
          this.total=0;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClose() {
      this.show = false;
    },
    onChange(event) {
      console.log(event.mp.detail);
    },
    onClickNav(event) {
      console.log(event.mp);
      this.mainActiveIndex = event.mp.detail.index;
      console.log(this.mainActiveIndex);
    },
    onSubmit() {
      console.log(this.total)
      if(this.total==0){
        wx.showToast({
          title: "您还未添加商品，请先添加商品",
          icon: "none",
          duration: 1500
        });
      }else{
        wx.navigateTo({
          url: "../orderPre/main"
       });
      }
    },
    addGoods(id,index) {
      // console.log(id, mainActiveIndex, index);
      // console.log(this.items);
      this.items[index].num=this.items[index].num+1;
      this.total = this.total + 1;
      if(this.items[index].ifsale==1&&this.items[index].num>this.items[index].tagNum){
        this.price=this.price+this.items[index].originPrice;
      }else{
       this.price=this.price+this.items[index].price;
      }
      // this.price = this.price + this.items[index].price;
      this.$https
        .request({
          url: this.$interfaces.addGoods,
          data: {
            cartId: this.$store.state.cartId,
            goodId: id,
            num: this.items[index].num,
            price: this.price,
            total: this.total
          },
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "POST"
        })
        .then(res => {
          if(this.items[index].num==this.items[index].tagNum){
              wx.showToast({
                title: "超过限购数量按原价计算",
                icon: "none",
                duration: 2000
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    subGoods(id,index) {
      this.items[index].num=this.items[index].num-1;
      this.total = this.total - 1;
      if(this.items[index].ifsale==1&&this.items[index].num>=this.items[index].tagNum){
        this.price=this.price-this.items[index].originPrice;
      }else{
       this.price=this.price-this.items[index].price;
      }
      // this.price = this.price - this.items[index].price;
      this.$https
        .request({
          url: this.$interfaces.subGoods,
          data: {
            cartId: this.$store.state.cartId,
            goodId: id,
            num: this.items[index].num,
            price: this.price,
            total: this.total
          },
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "POST"
        })
        .then(res => {
          console.log(res);
          if(this.items[index].num==0){
            this.items.splice(index,1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteGoods(id,index){
      this.total = this.total - this.items[index].num;
      this.price = this.price - this.items[index].price*this.items[index].num;
      this.$https
        .request({
          url: this.$interfaces.subGoods,
          data: {
            cartId: this.$store.state.cartId,
            goodId: id,
            num: 0,
            price: this.price,
            total: this.total
          },
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "POST"
        })
        .then(res => {
          console.log(res);
          if(res.flag==true){
            this.items.splice(index,1);
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
      //输入完成
      wx.navigateTo({
            url: "../login/main"
      });
      this.showModel=false;
      //校验手机号码
    },
  }
};
</script>

<style>
.goodSpan {
  text-align: center;
  display: inline-block;
  width: 50rpx;
  height: 50rpx;
  transform: translateY(-30%);
}
.van-button--normal{
  height: 100% !important;
}
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