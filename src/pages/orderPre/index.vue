<!--
 * @Description: “提交订单”界面
 * @Author: Hans
 * @Date: 2019-1-28 17:28:28
 * @LastEditTime: 2019-11-03 10:50:50
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="orderPre">
    <scroll-view scroll-y="true" style="height: 1150rpx;">
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
        ></van-card>
      </van-panel>
      <van-panel title="就餐方式">
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
      </van-panel>
      <van-field
        :message="message"
        rows="3"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入备注"
        input-class="textarea"
        show-word-limit
      />
    </scroll-view>
    <van-submit-bar :price="3050" button-text="确认支付" @submit="onSubmit"></van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainActiveIndex: 0,
      activeId: null,
      number: 0,
      radio: "1",
      show: false,
      message: "",
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
      this.radio = event.mp.detail;
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
.custom {
  height: 100rpx !important;
}
.page {
  height: 1150rpx !important;
}
/* .textarea {
  min-height: 150rpx !important;
} */
</style>