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
      <van-swipe-cell v-for="good in items" :key="good.item">
        <van-card
          :num="good.num"
          :tag="good.tag"
          :price="good.price"
          :desc="good.desc"
          :title="good.title"
          :thumb="good.thumb"
          :origin-price="good.originPrice"
        >
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
        <van-button slot="right" square text="删除" type="danger" class="delete-button" @click="deletGoods(good.id,index)"/>
      </van-swipe-cell>
    </scroll-view>
    <van-submit-bar :price="price*100" button-text="结算" @submit="onSubmit">
      <van-goods-action-icon icon="delete" text="清空" @click="onClick" v-if="total===0" />
      <van-goods-action-icon icon="delete" text="清空" @click="onClick" :info="total" v-else />
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
    onClickIcon() {
      this.show = true;
      console.log(this.show);
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
      wx.navigateTo({
        url: "../orderPre/main"
      });
    },
    addGoods(id,index) {
      // console.log(id, mainActiveIndex, index);
      // console.log(this.items);
      this.items[index].num=this.items[index].num+1;
      this.total = this.total + 1;
      this.price = this.price + this.items[index].price;
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
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    subGoods(id,index) {
      this.items[index].num=this.items[index].num-1;
      this.total = this.total - 1;
      this.price = this.price - this.items[index].price;
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
          if(this.items[index].num==0){
            this.items.splice(index,1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
</style>