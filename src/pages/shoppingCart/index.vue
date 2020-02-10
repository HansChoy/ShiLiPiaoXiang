<!--
 * @Description: “购物车”界面
 * @Author: Hans
 * @Date: 2019-1-28 17:28:28
 * @LastEditTime: 2019-11-03 10:50:50
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="shoppingCart">
    <scroll-view scroll-y="true" style="height: 1050rpx;">
      <van-swipe-cell v-for="good in items" :key="good.item">
        <van-card
          :num="good.num"
          :tag="good.tag"
          :price="good.price"
          :desc="good.desc"
          :title="good.title"
          :thumb="good.thumb"
        >
          <div slot="footer">
            <van-button icon="icon/sub.png" type="primary" color="#fafafa"></van-button>
            <span>{{good.num}}</span>
            <!-- <van-stepper v-model="value" default-value="0" /> -->
            <van-button icon="icon/add.png" type="primary" color="#fafafa"></van-button>
          </div>
        </van-card>
        <van-button slot="right" square text="删除" type="danger" class="delete-button" />
      </van-swipe-cell>
    </scroll-view>
    <van-submit-bar :price="3050" button-text="结算" @submit="onSubmit">
      <van-goods-action-icon icon="delete" text="清空" @click="onClickIcon" info="5" />
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
      test: [
        {
          item: 1,
          num: 0,
          tag: "标签",
          price: "10.00",
          desc: "描述",
          title: "商品标题",
          thumb: "http://localhost:8081/image/luroufan.jpg"
        },
        {
          item: 2,
          num: 0,
          tag: "标签",
          price: "20.00",
          desc: "描述",
          title: "商品标题",
          thumb: "http://localhost:8081/image/jipafan.jpg"
        }
      ],
      items: [
        {
          item: 1,
          num: 0,
          tag: "标签",
          price: "10.00",
          desc: "描述",
          title: "商品标题",
          thumb: "http://localhost:8081/image/luroufan.jpg"
        },
        {
          item: 2,
          num: 0,
          tag: "标签",
          price: "20.00",
          desc: "描述",
          title: "商品标题",
          thumb: "http://localhost:8081/image/jipafan.jpg"
        },
        {
          item: 1,
          num: 0,
          tag: "标签",
          price: "10.00",
          desc: "描述",
          title: "商品标题",
          thumb: "http://localhost:8081/image/luroufan.jpg"
        },
        {
          item: 1,
          num: 0,
          tag: "标签",
          price: "10.00",
          desc: "描述",
          title: "商品标题",
          thumb: "http://localhost:8081/image/luroufan.jpg"
        },
        {
          item: 1,
          num: 0,
          tag: "标签",
          price: "10.00",
          desc: "描述",
          title: "商品标题",
          thumb: "http://localhost:8081/image/luroufan.jpg"
        }
      ]
    };
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
    }
  }
};
</script>

<style>
</style>