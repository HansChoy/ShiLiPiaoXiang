<!--
 * @Description: 支付预览
 * @Author: Lin Changkun
 * @Date: 2019-10-18 20:00:45
 * @LastEditTime: 2019-11-04 00:00:57
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="page">
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">付款金额</div>
          <div class="weui-form-preview__value_in-hd">¥ {{price}}</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div v-for="(item, index) in serviceItem" :key="index">
          <orderPreviewItem :title="item.title" :price="item.price" :num="item.num"></orderPreviewItem>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div
          class="weui-form-preview__btn weui-form-preview__btn_primary"
          hover-class="weui-form-preview__btn_active"
          @click="toPay"
        >确认支付</div>
        <div :class="{'CustomPopup':showCustomPopup}">
          <div :class="{'block':isBlockm,'forPop':true}"></div>
          <div v-if="showRegister" class="registerPart">
            <img @click="maskClick" src="/static/images/icon/cancel.png" />
            <div class="title">请输入支付密码</div>
            <div class="detail">付款给十里飘香</div>
            <div class="price">¥ {{price}}</div>
            <div class="pwipt">
              <input
                type="number"
                @input="judgePassword"
                v-model="password"
                autofocus
                maxlength="6"
              />
              <div class="border-right">
                <span v-if="show1"></span>
              </div>
              <div class="border-right">
                <span v-if="show2"></span>
              </div>
              <div class="border-right">
                <span v-if="show3"></span>
              </div>
              <div class="border-right">
                <span v-if="show4"></span>
              </div>
              <div class="border-right">
                <span v-if="show5"></span>
              </div>
              <div>
                <span v-if="show6"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import base64 from '../../../static/images/base64';
import orderPreviewItem from "../../components/orderPreviewItem/index";
import payCell from "../../components/payCell/index";

export default {
  components: {
    orderPreviewItem,
    payCell
  },
  props: {
    id: String, // 当一个页面有多个密码输入框时，用id来区分
    default: "1"
  },
  data() {
    return {
      // icon60: base64.icon60
      // orderForm: undefined,
      /**支付框 */
      password: "",
      autofocus: true,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      /********** */
      price: 0,
      total: 0,
      block: false,
      showRegister: false,
      showCustomPopup: false,
      serviceItem: []
    };
  },
  // onShow() {
  //   //将台
  //   // this.order.price = this.$store.state.orderForm.price;
  //   // this.order.date = this.$store.state.orderForm.date;
  //   // this.order.comm = this.$store.state.orderForm.remarks;
  //   // this.order.detailTypeId = this.$store.state.orderForm.date;
  //   // this.order.userAddressId = this.$store.state.orderForm.date;
  //   // this.order.userId = this.$store.state.fakeId
  //   // ⚠️一开始将存起来的orderForm一项一项赋给serviceItem[？].content
  //   // this.password = "";
  //   // this.show1 = false;
  //   // this.show2 = false;
  //   // this.show3 = false;
  //   // this.show4 = false;
  //   // this.show5 = false;
  //   // this.show6 = false;
  //   // this.showCustomPopup = false;
  //   // this.showRegister = false;
  //   this.price = 1000; //价格
  //   this.serviceItem[0].content = '炸鸡'; //服务
  //   this.serviceItem[1].content = '按件'; //计费规则
  //   this.serviceItem[2].content = 'ikun'; //用户名
  //   this.serviceItem[3].content = '2020-2-24'; //上门时间
  //   this.serviceItem[4].content =
  //     '广东省' +
  //     "-" +'潮州市'
  //   this.serviceItem[5].content = '123456'; //联系电话
  //   this.serviceItem[6].content = 'wu'; //备注
  // },
  mounted() {
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
        this.total =res.data.total;
        this.price = res.data.price;
        this.serviceItem = res.data.goods;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    maskClick() {
      this.block = false;
      this.showCustomPopup = false;
      this.showRegister = false;
    },
    toPay() {
      this.$store.dispatch("setPrice",this.price);
      this.$https
      .request({
        url: this.$interfaces.addOrder,
        data: {
          userId:this.$store.state.userId,
          cartId:this.$store.state.cartId,
          total:this.total,
          price:this.price,
          note:this.$store.state.orderForm.note,
          type:this.$store.state.orderForm.type
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        method: "POST"
      })
      .then(res => {
        console.log("下单成功");
      })
      .catch(err => {
        console.log(err);
      });
      wx.navigateTo({
        url: "../payOver/main"
      });
      // this.showCustomPopup = true;
      // this.block = true;
      // this.showRegister = true;
    },
    /*******支付密码框********/
    //关闭密码输入清空输入
    closePop: function() {
      this.password = "";
      this.showCustomPopup = false;
      // this.judgePassword();
    },

    //校验密码
    surePassword: function() {
      // 调用密码校验接口

      // 校验完成，向后端发送订单数据
      //跳转到支付完成页面
      wx.navigateTo({
        url: "../payOver/main",
        success: res => {
          this.password = "";
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
          this.show4 = false;
          this.show5 = false;
          this.show6 = false;
          this.showRegister = false;
          this.showCustomPopup = false;
          console.log("密码缓存已清除");
        }
      });
    },

    // 密码输入样式
    judgePassword: function() {
      console.log("密码");
      console.log(this.password);
      if (this.password.length == 0) {
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        this.show6 = false;
      }
      if (this.password.length == 1) {
        this.show1 = true;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        this.show6 = false;
      }
      if (this.password.length == 2) {
        this.show1 = true;
        this.show2 = true;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        this.show6 = false;
      }
      if (this.password.length == 3) {
        this.show1 = true;
        this.show2 = true;
        this.show3 = true;
        this.show4 = false;
        this.show5 = false;
        this.show6 = false;
      }
      if (this.password.length == 4) {
        this.show1 = true;
        this.show2 = true;
        this.show3 = true;
        this.show4 = true;
        this.show5 = false;
        this.show6 = false;
      }
      if (this.password.length == 5) {
        this.show1 = true;
        this.show2 = true;
        this.show3 = true;
        this.show4 = true;
        this.show5 = true;
        this.show6 = false;
      }
      if (this.password.length == 6) {
        this.show1 = true;
        this.show2 = true;
        this.show3 = true;
        this.show4 = true;
        this.show5 = true;
        this.show6 = true;
        // 接口校验密码
        this.surePassword();
      }
    }
  }
};
</script>

<style>
.page {
  margin-top: 50px;
}

/********弹出支付框******/
.CustomPopup {
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.registerPart {
  background-color: white;
  width: 300px;
  height: 250px;
  border: #888888 2px solid;
  position: fixed;
  left: 77%;
  top: 63%;
  margin-top: -200px;
  margin-left: -250px;
  text-align: center;
  border-radius: 6%;
}
.registerPart img {
  width: 20px;
  height: 20px;
  float: left;
  margin-top: 22rpx;
  margin-left: 22rpx;
}
.forPop {
  width: 60%;
  height: 50%;
  top: 0px;
  left: 0px;
  position: absolute;
  /*因为IE不支持opacity 所以用filter 为了兼容两个都写*/
  filter: Alpha(opacity=60);
  opacity: 0.6;
  background: #000000;
  display: none;
}
.block {
  display: block;
}
.title {
  margin-bottom: 10px;
}
.detail {
  margin-bottom: 12rpx;
  margin-left: 24px;
  margin-top: -8px;
}
.price {
  font-size: 36px;
  font-weight: bold;
  border-bottom: 2rpx solid #ccc;
  margin: 0 20rpx 32rpx 20rpx;
  padding-bottom: 18rpx;
}
.pwipt {
  font-size: 0;
  height: 45px;
  line-height: 45px;
  width: 240px;
  border: 1px solid #ccc;
  margin-left: 62rpx;
}
.pwipt div {
  display: inline-block;
  width: 16.2%;
  height: 45px;
  position: relative;
}
.pwipt .border-right {
  border-right: 1px solid #ccc;
}
.pwipt div > span {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #000;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  margin-top: -5px;
  margin-left: -5px;
}
.pwipt input {
  outline: none;
  border: 0;
  background: none;
  width: 900px;
  height: 0;
  padding: 22px 0;
  text-align: center;
  position: absolute;
  left: -500px;
  right: 0;
  z-index: 1000;
  color: transparent;
  text-indent: -999em;
}
</style>