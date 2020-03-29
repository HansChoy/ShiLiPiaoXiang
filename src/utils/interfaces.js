/*
 * @Description: 请求接口
 * @Author: Lin Changkun
 * @Date: 2019-10-03 00:07:05
 * @LastEditTime: 2019-11-03 21:56:43
 * @LastEditors: Lin Changkun
 */
// const domain = "http://192.168.0.100:8081/json/";
const domain = "https://www.hanschoy.club:8081/json/"; //局域网通信
// const domain = "https://ilfengzi.club/";    //服务器通信

const interfaces = {
  getGoods: domain +'goods/showGoods',//获取所有商品
  getOpenid: domain + 'getCode', // 获取openID的接口
  addGoods:domain +'shoppingCart/addGoods',
  subGoods:domain +'shoppingCart/subGoods',
  showCartGoods:domain +'shoppingCart/showCartGoods',
  commitCartGoods:domain +'shoppingCart/commitCartGoods',
  getRecommendGoods:domain +'goods/getRecommendGoods',
  showGoodDetail:domain +'goods/showGoodDetail',
  getCartGoodsDetail: domain +'shoppingCart/getCartGoodsDetail',
  addOrder:domain+'order/addOrder',
  showOrderPreview: domain+'order/showOrderPreview',
  showOrder: domain+'order/showOrder',
  deleteCartGoods:domain+'shoppingCart/deleteCartGoods',
  makeEvaluate: domain + 'order/makeEvaluate', //新建评价
  showEvaluate: domain +'order/showEvaluate',
  addEvaluateReply: domain +'order/addEvaluateReply',
  showAllEvaluate: domain +'order/showAllEvaluate',
};

module.exports = interfaces;
