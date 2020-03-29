<!--
 * @Description: 订单预览项
 * @Author: 
 * @Date: 2019-10-19 21:11:23
 * @LastEditTime: 2019-10-19 21:23:00
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="orderPreviewItem">
    <div class="weui-form-preview__item">
      <div class="weui-form-preview__label" :title="title">{{title}}</div>
      <div class="weui-form-preview__value" :price="price" :num="num" :tagNum="tagNum" :ifsale="ifsale" v-if="ifsale==0||num<=tagNum">￥{{price}}×{{num}}</div>
      <div class="weui-form-preview__value" :price="price" :num="num" :tagNum="tagNum" :originPrice="originPrice" v-else>￥{{price}}×{{tagNum}},￥{{originPrice}}×{{num-tagNum}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    price: Number,
    num:Number,
    originPrice:Number,
    tagNum:Number,
    ifsale:Number
  }
};
</script>

<style>
</style>