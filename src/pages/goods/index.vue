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
      <div slot="content" v-for="(good,index) in items[mainActiveIndex].cGoods" :key="good.item">
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
            <van-icon name="icon/sub.png" size="50rpx" @click="subGoods(good.id,mainActiveIndex,index)" v-if="good.num!==0" />
            <!-- <van-button icon="icon/sub.png" type="mini" color="#fafafa" v-if="good.num!==0"></van-button> -->
            <div class="goodSpan">
              <span v-if="good.num!==0">{{good.num}}</span>
            </div>
            <!-- <van-stepper v-model="value" default-value="0" /> -->
            <van-icon
              name="icon/add.png"
              size="50rpx"
              @click="addGoods(good.id,mainActiveIndex,index)"
            />
            <!-- <van-button icon="icon/add.png" type="mini" color="#fafafa" @click="addGoods"></van-button> -->
          </div>
        </van-card>
      </div>
    </van-tree-select>
    <van-submit-bar :price="price*100" button-text="结算" @submit="onSubmit">
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClick" v-if="total===0" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClick" :info="total" v-else />
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
      items: [],
      price: 0.0,
      total: 0
    };
  },
  created() {
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
          url: this.$interfaces.showCartGoods,
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
    login() {
      //判断授权是否成功
      // console.log(e);
      wx.login({
        success: res => {
          // this.js_code = res.code;
          this.$https
            .request({
              url: this.$interfaces.getOpenid,
              data: {
                getcode: res.code
                // userInfo: e.mp.detail.userInfo
              },
              header: {
                "content-type": "application/json" // 默认值
              },
              method: "POST"
            })
            .then(res => {
              // console.log("成功向后端发送用户公开信息");
              this.$store.dispatch("setUserId", res.data[0]);
              this.$store.dispatch("setCartId", res.data[1]);
              this.$store.dispatch("setHaveLogin", true);
              // console.log("UserId:", this.$store.state.userId);
              // console.log("CartIdId:", this.$store.state.cartId);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
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
      wx.navigateTo({
        url: "../shoppingCart/main"
      });
    },
    onClickThumb() {
      wx.navigateTo({
        url: "../goodsDetail/main"
      });
    },
    onSubmit() {
      // if (this.haveLogin != true) {
      //   this.onGotUserInfo();
      // }
      wx.navigateTo({
        url: "../orderPre/main"
      });
    },
    addGoods(id, mainActiveIndex, index) {
      // console.log(id, mainActiveIndex, index);
      // console.log(this.items);
      this.items[mainActiveIndex].info = this.items[mainActiveIndex].info + 1;
      this.items[mainActiveIndex].cGoods[index].num =
        this.items[mainActiveIndex].cGoods[index].num + 1;
      this.total = this.total + 1;
      this.price = this.price + this.items[mainActiveIndex].cGoods[index].price;
      this.$https
        .request({
          url: this.$interfaces.addGoods,
          data: {
            cartId: this.$store.state.cartId,
            // userId: this.$store.state.userId,
            goodId: id,
            num: this.items[mainActiveIndex].cGoods[index].num,
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    subGoods(id, mainActiveIndex, index) {
      console.log(id, mainActiveIndex, index);
      console.log(this.items);
      this.items[mainActiveIndex].info = this.items[mainActiveIndex].info - 1;
      this.items[mainActiveIndex].cGoods[index].num =
        this.items[mainActiveIndex].cGoods[index].num - 1;
      this.total = this.total - 1;
      this.price = this.price - this.items[mainActiveIndex].cGoods[index].price;
      this.$https
        .request({
          url: this.$interfaces.subGoods,
          data: {
            cartId: this.$store.state.cartId,
            // userId: this.$store.state.userId,
            goodId: id,
            num: this.items[mainActiveIndex].cGoods[index].num,
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
.goodSpan {
  text-align: center;
  display: inline-block;
  width: 50rpx;
  height: 50rpx;
  transform: translateY(-30%);
}
</style>