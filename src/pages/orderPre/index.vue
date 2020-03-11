<!--
 * @Description: “提交订单”界面
 * @Author: Hans
 * @Date: 2019-1-28 17:28:28
 * @LastEditTime: 2019-11-03 10:50:50
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="orderPre">
    <scroll-view scroll-y="true" style="height: 1080rpx;">
      <van-panel title="商品">
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
        ></van-card>
      </van-panel>
      <van-panel title="就餐方式">
        <div style="padding:20rpx">
        <van-radio-group :value="radio" @change="onChange" custom-class="custom">
          <van-row gutter="20" style="height:50rpx">
            <van-col span="8">
              <van-radio name="1" style="inline-block">堂食</van-radio>
            </van-col>
            <van-col span="8">
              <van-radio name="2" style="inline-block">打包</van-radio>
            </van-col>
          </van-row>
        </van-radio-group>
        </div>
      </van-panel>
      <!-- <remarksPicker @click="getChildRemarks"></remarksPicker> -->
      <van-field
        v-model="message"
        rows="3"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入备注"
        input-class="textarea"
        show-word-limit
        @change="onInput"
      />
    </scroll-view>
    <van-submit-bar :price="price*100" button-text="确认支付" @submit="onSubmit"></van-submit-bar>
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
      radio: '1',
      show: false,
      message: "",
      price:0.0,
      items: [],
      form:{
        note:null,
        type:null,
      },
    };
  },
  mounted() {
    // if(this.$store.state.serviceDetail!=null){
    //   this.mainActiveIndex=this.$store.state.serviceDetail;
    // }
    if (this.$store.state.haveLogin != true) {
      this.$https
        .request({
          url: this.$interfaces.getGoods,
          data: {},
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "GET"
        })
        .then(res => {
          console.log(res);
          this.items = res.goods;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
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
    onInput(event) {
      this.message=event.mp.detail;
      // console.log(this.message,event.mp.detail);
    },
    onSubmit() {
      this.form.note=this.message;
      if(this.radio=="1"){
        this.form.type=1;
      }else {
        this.form.type=2
      }
      // console.log(this.form);
      this.$store.dispatch("setOrderForm", this.form);
      // console.log(this.$store.state.orderForm);
      wx.navigateTo({
        url: "../orderPreview/main"
      });
    },
    onClose() {
      this.show = false;
    },
    onChange(event) {
      this.radio = event.mp.detail;
      console.log(event.mp.detail);
    },
  }
};
</script>

<style>
.custom {
  height: 100rpx !important;
}
.page {
  height: 1150rpx !important;
}
/* .textarea {
  padding: 20rpx;
  min-height: 150px !important;
} */
</style>