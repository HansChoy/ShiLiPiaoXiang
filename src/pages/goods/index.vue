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
      height="1400rpx"
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @clickNav="onClickNav"
      @clickItem="onClickItem"
    >
      <div slot="content" v-for="good in items[mainActiveIndex].children" :key="good.item">
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
      </div>
    </van-tree-select>
    <van-submit-bar :price="3050" button-text="结算" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
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
    onChange(event) {
      console.log(event.mp.detail);
    },
    onClickNav(event) {
      console.log(event.mp);
      this.mainActiveIndex = event.mp.detail.index;
      console.log(this.mainActiveIndex);
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