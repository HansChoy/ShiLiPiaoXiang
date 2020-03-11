<!--
 * @Description: 服务小项（已完成）
 * @Author: Lin Changkun
 * @Date: 2019-10-10 16:40:27
 * @LastEditTime: 2019-10-28 19:24:11
 * @LastEditors: Lin Changkun
 -->
<template>
  <div class="service_cell" @click="$emit('click')">
    <img :src="img" alt />
    <div class="cell_text">
      <h4>{{title}}</h4>
      <h5>{{describe}}</h5>
      <!-- <p>
        <span class="level">{{level}}</span>
        <span class="learn_count">{{count}}</span>
      </p> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    img: String,
    title: String,
    level: String,
    describe: String,
    count: String
  },
  methods: {}
};
</script>
<style>
.service_cell {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  height: 300rpx;
  padding: 20rpx 20rpx;
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
}
.service_cell img {
  width: 50%;
  height: 250rpx;
  margin-right: 10px;
  border-radius: 5px;
}
.cell_text {
  width: 70%;
}
.cell_text h4 {
  /* margin-top: 2px; */
  /* height: 60px; */
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.cell_text h5 {
  margin-top: 2px;
  color: darkgray;
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
/* .cell_text p {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cell_text p .level {
  color: #eb8831;
  margin-right: 20px;
}
.cell_text p .learn_count {
  color: #ccc;
} */
</style>