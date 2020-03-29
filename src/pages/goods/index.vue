<!--
 * @Description: “商品分类”界面
 * @Author: Hans
 * @Date: 2019-1-28 17:28:28
 * @LastEditTime: 2019-11-03 10:50:50
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="goods">
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
              <van-tree-select
                height="980rpx"
                :items="items"
                :main-active-index="mainActiveIndex"
                :active-id="activeId"
                @clickNav="onClickNav"
                @clickItem="onClickItem"
              >
                <div
                  slot="content"
                  v-for="(good,index) in items[mainActiveIndex].cGoods"
                  :key="good.item"
                >
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
                      <van-icon
                        name="icon/sub.png"
                        size="50rpx"
                        @click="subGoods(good.id,mainActiveIndex,index)"
                        v-if="good.num!==0"
                      />
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
                <van-goods-action-icon
                  icon="cart-o"
                  text="购物车"
                  @click="onClick"
                  :info="total"
                  v-else
                />
              </van-submit-bar>
            </div>
            <div class="weui-tab__content" :hidden="activeIndex != 1">
              <div v-for="(item,index) in evaluateList" :key="index">
                <evaluateCell :evaluateList="item"></evaluateCell>
              </div>
            </div>
          </div>
        </div>
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
      mainActiveIndex: 0,
      activeId: null,
      number: 0,
      value: 0,
      show: false,
      items: [],
      price: 0.0,
      total: 0,
      tabs: ["点餐", "评价"],
      activeIndex: 0,
      evaluateList:[]
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
    if (this.$store.state.serviceDetail != null) {
      this.mainActiveIndex = this.$store.state.serviceDetail;
    }
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
    tabClick(e) {
      this.activeIndex = Number(e.currentTarget.id);
      if (this.activeIndex == 0 && this.$store.state.haveLogin != true) {
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
      } else if (this.activeIndex == 0 && this.$store.state.haveLogin == true) {
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
      } else {
        this.$https
          .request({
            url: this.$interfaces.showAllEvaluate,
            data: {
            },
            header: {
              "content-type": "application/json" // 默认值
            },
            method: "GET"
          })
          .then(res => {
            // 成功，刷新页面
            this.evaluateList = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
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
    onClick() {
      wx.switchTab({
        url: "../shoppingCart/main"
      });
    },
    onClickThumb(id) {
      this.$store.dispatch("setGoodId", id);
      wx.navigateTo({
        url: "../goodsDetail/main"
      });
    },
    onSubmit() {
      // if (this.haveLogin != true) {
      //   this.onGotUserInfo();
      // }
      if (this.total == 0) {
        wx.showToast({
          title: "您还未添加商品，请先添加商品",
          icon: "none",
          duration: 1500
        });
      } else {
        wx.navigateTo({
          url: "../orderPre/main"
        });
      }
    },
    addGoods(id, mainActiveIndex, index) {
      if (this.$store.state.haveLogin != true) {
        wx.navigateTo({
          url: "../login/main"
        });
      } else {
        let goodIndex = this.items[mainActiveIndex].cGoods[index].index;
        console.log(goodIndex, index);
        if (
          mainActiveIndex != 0 &&
          this.items[mainActiveIndex].cGoods[index].ifsale == 1
        ) {
          this.items[0].info = this.items[0].info + 1;
          this.items[0].cGoods[goodIndex].num =
            this.items[0].cGoods[goodIndex].num + 1;
        } else if (
          mainActiveIndex == 0 &&
          this.items[mainActiveIndex].cGoods[index].ifsale == 1
        ) {
          let typeId = this.items[mainActiveIndex].cGoods[index].typeId;
          this.items[mainActiveIndex].info =
            this.items[mainActiveIndex].info + 1;
          this.items[typeId - 2].cGoods[goodIndex].num =
            this.items[typeId - 2].cGoods[goodIndex].num + 1;
        } else {
          this.items[mainActiveIndex].info =
            this.items[mainActiveIndex].info + 1;
        }
        this.items[mainActiveIndex].cGoods[index].num =
          this.items[mainActiveIndex].cGoods[index].num + 1;
        this.total = this.total + 1;
        if (
          this.items[mainActiveIndex].cGoods[index].ifsale == 1 &&
          this.items[mainActiveIndex].cGoods[index].num >
            this.items[mainActiveIndex].cGoods[index].tagNum
        ) {
          this.price =
            this.price + this.items[mainActiveIndex].cGoods[index].originPrice;
        } else {
          this.price =
            this.price + this.items[mainActiveIndex].cGoods[index].price;
        }
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
            // console.log(res);
            if (
              this.items[mainActiveIndex].cGoods[index].num ==
              this.items[mainActiveIndex].cGoods[index].tagNum
            ) {
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
      }
      // console.log(id, mainActiveIndex, index);
      // console.log(this.items);
    },
    subGoods(id, mainActiveIndex, index) {
      // console.log(id, mainActiveIndex, index);
      // console.log(this.items);
      if (this.$store.state.haveLogin != true) {
        wx.navigateTo({
          url: "../login/main"
        });
      } else {
        let goodIndex = this.items[mainActiveIndex].cGoods[index].index;
        if (
          mainActiveIndex != 0 &&
          this.items[mainActiveIndex].cGoods[index].ifsale == 1
        ) {
          this.items[0].info = this.items[0].info - 1;
          this.items[0].cGoods[goodIndex].num =
            this.items[0].cGoods[goodIndex].num - 1;
        } else if (
          mainActiveIndex == 0 &&
          this.items[mainActiveIndex].cGoods[index].ifsale == 1
        ) {
          let typeId = this.items[mainActiveIndex].cGoods[index].typeId;
          this.items[mainActiveIndex].info =
            this.items[mainActiveIndex].info - 1;
          this.items[typeId - 2].cGoods[goodIndex].num =
            this.items[typeId - 2].cGoods[goodIndex].num - 1;
        } else {
          this.items[mainActiveIndex].info =
            this.items[mainActiveIndex].info - 1;
        }
        this.items[mainActiveIndex].cGoods[index].num =
          this.items[mainActiveIndex].cGoods[index].num - 1;
        this.total = this.total - 1;
        if (
          this.items[mainActiveIndex].cGoods[index].ifsale == 1 &&
          this.items[mainActiveIndex].cGoods[index].num >=
            this.items[mainActiveIndex].cGoods[index].tagNum
        ) {
          this.price =
            this.price - this.items[mainActiveIndex].cGoods[index].originPrice;
        } else {
          this.price =
            this.price - this.items[mainActiveIndex].cGoods[index].price;
        }
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
.weui-navbar {
  background-color: white;
}
.weui-navbar__title {
  display: block;
}
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