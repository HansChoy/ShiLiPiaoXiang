<!--
 * @Description: “商品详情”界面
 * @Author: Hans
 * @Date: 2019-1-28 17:28:28
 * @LastEditTime: 2019-11-03 10:50:50
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="goodsDetail">
    <van-image
      width="750rpx"
      height="400rpx"
      :src="img"
    />
    <!-- <img :src="img" mode="center" /> -->
    <van-panel title="主要材料">
      <div>猪肉、米饭、糖</div>
    </van-panel>
    <van-panel title="评价">
      <div>好吃</div>
    </van-panel>
    <van-submit-bar :price="3050" button-text="加入购物车" @submit="onSubmit">
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
      show:false,
      img:"http://localhost:8081/image/jipafan.jpg",
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
          text: "精品套餐",
          children: [
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
          item: 2,
          num: 0,
          tag: "标签",
          price: "20.00",
          desc: "描述",
          title: "商品标题",
          thumb: "http://localhost:8081/image/jipafan.jpg"
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
          item: 2,
          num: 0,
          tag: "标签",
          price: "20.00",
          desc: "描述",
          title: "商品标题",
          thumb: "http://localhost:8081/image/jipafan.jpg"
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
          item: 2,
          num: 0,
          tag: "标签",
          price: "20.00",
          desc: "描述",
          title: "商品标题",
          thumb: "http://localhost:8081/image/jipafan.jpg"
        }
          ],
          dot: true
        },
        {
          text: "折扣",
          children: [
            {
              item: 1,
              num: 0,
              tag: "标签",
              price: "10.00",
              desc: "描述",
              title: "商品标题",
              thumb: "http://localhost:8081/image/luroufan.jpg"
            }
          ],
          info: 5
        }
      ]
    };
  },
  methods: {
    onClick(){
      wx.switchTab({
        url: "../shoppingCart/main"
      });
    },
    onClose(){
      this.show=false;
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