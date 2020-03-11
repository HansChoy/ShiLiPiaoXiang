<!--
 * @Description: “商品详情”界面
 * @Author: Hans
 * @Date: 2019-1-28 17:28:28
 * @LastEditTime: 2019-11-03 10:50:50
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="goodsDetail">
    <van-image width="750rpx" height="400rpx" :src="img" />
    <!-- <img :src="img" mode="center" /> -->
    <van-panel :title="title">
      <div style="padding:20rpx;width:30%;display:inline-block">
        <span style="color:red;font-weight:bold;font-size:18px">¥{{price}}</span>
        &nbsp;
        <span
          v-if="origin_price!=null"
          style="text-decoration:line-through;font-size:14px;color:#C0C0C0"
        >¥{{origin_price}}</span>
      </div>
      <div class="right">
        <div style="float:right">
          <van-icon name="icon/sub.png" size="50rpx" @click="subGoods(id)" v-if="num!==0" />
          <!-- <van-button icon="icon/sub.png" type="mini" color="#fafafa" v-if="good.num!==0"></van-button> -->
          <div class="goodSpan">
            <span v-if="num!==0">{{num}}</span>
          </div>
          <!-- <van-stepper v-model="value" default-value="0" /> -->
          <van-icon name="icon/add.png" size="50rpx" @click="addGoods(id)" />
        </div>
      </div>
    </van-panel>
    <van-panel title="主要材料">
      <div style="padding:20rpx">{{material}}</div>
    </van-panel>
    <van-panel title="评价">
      <div>暂无评价</div>
    </van-panel>
    <van-submit-bar :price="sum*100" button-text="加入购物车" @submit="onSubmit">
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClick" v-if="total===0" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClick" :info="total" v-else />
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: "",
      material: "",
      title: "",
      desc: "",
      price: 0,
      id: 0,
      num: 0,
      total: 0,
      sum: 0.0,
      origin_price: null
    };
  },
  mounted() {
    if (this.$store.state.haveLogin != true) {
      this.$https
        .request({
          url: this.$interfaces.showGoodDetail,
          data: {
            id: this.$store.state.goodId
          },
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "POST"
        })
        .then(res => {
          this.id = res.cGoods.id;
          this.img = res.cGoods.thumb;
          this.material = res.cGoods.material;
          this.price = res.cGoods.price;
          this.origin_price = res.cGoods.originPrice;
          this.num = res.cGoods.num;
          this.desc = res.cGoods.desc;
          this.title = res.cGoods.title;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.$https
        .request({
          url: this.$interfaces.getCartGoodsDetail,
          data: {
            cartId: this.$store.state.cartId,
            goodId: this.$store.state.goodId
          },
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "POST"
        })
        .then(res => {
          this.id = res.data.goods.id;
          this.img = res.data.goods.thumb;
          this.material = res.data.goods.material;
          this.price = res.data.goods.price;
          this.origin_price = res.data.goods.originPrice;
          this.num = res.data.goods.num;
          this.desc = res.data.goods.desc;
          this.title = res.data.goods.title;
          this.total = res.data.total;
          this.sum=res.data.sum;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    onClick() {
      wx.switchTab({
        url: "../shoppingCart/main"
      });
    },
    onClose() {
      this.show = false;
    },
    onSubmit() {
      wx.navigateTo({
        url: "../shoppingCart/main"
      });
    },
    addGoods(id) {
      this.num = this.num + 1;
      this.total = this.total + 1;
      this.sum = this.sum + this.price;
      this.$https
        .request({
          url: this.$interfaces.addGoods,
          data: {
            cartId: this.$store.state.cartId,
            // userId: this.$store.state.userId,
            goodId: id,
            num: this.num,
            price: this.sum,
            total: this.total
          },
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "POST"
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    subGoods(id) {
      this.num = this.num - 1;
      this.total = this.total - 1;
      this.sum = this.sum - this.price;
      this.$https
        .request({
          url: this.$interfaces.subGoods,
          data: {
            cartId: this.$store.state.cartId,
            // userId: this.$store.state.userId,
            goodId: id,
            num: this.num,
            price: this.sum,
            total: this.total
          },
          header: {
            "content-type": "application/json" // 默认值
          },
          method: "POST"
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.left {
  float: left;
}
.right {
  width: 50%;
  height: 20%;
  padding: 20rpx;
  float: right;
}
.audio {
  margin: 0 0 0 70rpx;
}
.title {
  text-align: center;
}
.tips {
  color: slategrey;
  text-align: center;
  margin: 150rpx 0 50rpx auto;
}
.goodSpan {
  text-align: center;
  display: inline-block;
  width: 50rpx;
  height: 50rpx;
  transform: translateY(-30%);
}
</style>