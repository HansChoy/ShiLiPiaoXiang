<!--
 * @Description: “订单详情”界面
 * @Author: Hans
 * @Date: 2019-1-28 17:28:28
 * @LastEditTime: 2019-11-03 10:50:50
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="detail">
    <scroll-view scroll-y="true" style="height: 100%;">
      <van-panel title="商品" use-footer-slot>
        <van-card
          v-for="good in items"
          :key="good.item"
          :num="good.num"
          :tag="good.tag"
          :price="good.price"
          :desc="good.desc"
          :title="good.title"
          :thumb="good.thumb"
          :origin-price="good.originPrice"
        ><div slot="tags" v-if="good.ifsale==1">
            <van-tag plain type="danger">限购{{good.tagNum}}件</van-tag>
        </div>
        </van-card>
        
        <div slot="footer" class="footer-class">
          <div class="right">
            <!-- <van-button size="small">按钮</van-button>
            <van-button size="small" type="danger">按钮</van-button> -->
            <div style="float:right">
            <span style="font-size:14px;display:inline-block">共:</span>
            <span style="font-size:20px;color:red;font-weight: bold;display:inline-block" :total="total">{{total}}</span>
            <span style="font-size:14px;display:inline-block">件商品，合计:</span>
            <span style="font-size:20px;color:red;font-weight: bold;display:inline-block" :price="price">{{price}}</span>
            <span style="font-size:14px;display:inline-block">元</span>
            </div>
          </div>
        </div>
      </van-panel>
      <van-panel title="订单信息">
        <div style="padding:20rpx">
          <div class="weui-form-preview">
            <div class="weui-form-preview__bd">
              <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">取餐码</div>
                <div class="weui-form-preview__value">{{order.code}}</div>
              </div>
              <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">订单号</div>
                <div class="weui-form-preview__value">{{order.orderno}}</div>
              </div>
              <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">下单时间</div>
                <div class="weui-form-preview__value">{{orderTime}}</div>
              </div>
            </div>
          </div>
        </div>
      </van-panel>
      <van-panel title="备注信息">
        <div style="padding:20rpx">{{note}}</div>
      </van-panel>
    </scroll-view>
  </div>
</template>

<script>
import remarksPicker from "../../components/remarksPicker/index";
export default {
  components: {
    remarksPicker
  },
  data() {
    return {
      mainActiveIndex: 0,
      activeId: null,
      number: 0,
      radio: "1",
      show: false,
      message: "",
      price: 0.0,
      total:0,
      items: [],
      order: [],
      orderTime:null,
      note:null,
    };
  },
  onShow() {
    // if(this.$store.state.serviceDetail!=null){
    //   this.mainActiveIndex=this.$store.state.serviceDetail;
    // }
    // console.log(this.$store.state.cartId);
    this.$https
      .request({
        url: this.$interfaces.showOrder,
        data: {
          orderId: this.$store.state.orderId
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        method: "POST"
      })
      .then(res => {
        // console.log(res);
        this.items = res.data.cOrder.cGoodsList;
        this.price = res.data.cOrder.price;
        this.total = res.data.cOrder.total;
        this.order = res.data.cOrder;
        this.orderTime = res.data.orderTime;
        this.note=res.data.cOrder.note;
        console.log(this.items)
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
  }
};
</script>

<style>
.custom {
  height: 100rpx !important;
}
.footer-class{
  padding: 10px 0px 40px;
}
.right {
  width: 90%;
  height: 100%;
  /* padding: 0 0 20rpx 0; */
  float: right;
  position: relative;
}
/* .page {
  height: 1150rpx !important;
} */
/* .textarea {
  padding: 20rpx;
  min-height: 150px !important;
} */
</style>