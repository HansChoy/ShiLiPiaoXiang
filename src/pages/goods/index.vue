<!--
 * @Description: “商品分类”界面
 * @Author: Hans
 * @Date: 2019-1-28 17:28:28
 * @LastEditTime: 2019-11-03 10:50:50
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="goods">
    <van-tree-select
      height="1080rpx"
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @clickNav="onClickNav"
      @clickItem="onClickItem"
    >
      <div slot="content" v-for="good in items[mainActiveIndex].cGoods" :key="good.item">
        <van-card
          :num="good.num"
          :tag="good.tag"
          :price="good.price"
          :desc="good.desc"
          :title="good.title"
          :thumb="good.thumb"
          :origin-price="good.originPrice"
          @clickThumb="onClickThumb"
        >
          <div slot="footer">
            <van-icon name="icon/sub.png" size="50rpx" @click="subGoods" v-if="good.num!==0" />
            <!-- <van-button icon="icon/sub.png" type="mini" color="#fafafa" v-if="good.num!==0"></van-button> -->
            <span v-if="good.num!==0">{{good.num}}</span>
            <!-- <van-stepper v-model="value" default-value="0" /> -->
            <van-icon name="icon/add.png" size="50rpx" @click="addGoods" />
            <!-- <van-button icon="icon/add.png" type="mini" color="#fafafa" @click="addGoods"></van-button> -->
          </div>
        </van-card>
      </div>
    </van-tree-select>
    <van-submit-bar :price="3050" button-text="结算" @submit="onSubmit">
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClick" info="5" />
    </van-submit-bar>
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
      items:[]
    };
  },
  created() {
    this.$https
      .request({
        url: this.$interfaces.getGoods,
        data: {
          // userInfo: this.$store.state.user, //用户信息
          // getcode: this.js_code //wx.login登录获取的code值
          // getcode: res.code
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        method: "GET"
      })
      .then(res => {
        console.log(res);
        this.items=res.goods;
        // console.log(this.items);
      })
      .catch(err => {
        console.log(err);
      });
      console.log(this.item);
  },
  methods: {
    // onClickItem(){
    //   console.log(22222);
    // },
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
    onClickThumb() {
      console.log(22222);
      wx.navigateTo({
        url: "../goodsDetail/main"
      });
    },
    onSubmit() {
      wx.navigateTo({
        url: "../shoppingCart/main"
      });
    },
    addGoods(event) {
      console.log(11111);
    }
  }
};
</script>

<style>
.left {
  height: 700rpx;
  width: 100rpx;
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
</style>