<template>
    <div class="goods-info" @click="goGoodsPage()">
        <div class="goods-image">
            <img v-lazy="goodsImage" alt="" width="90%">
        </div>
        <div class="goods-name">{{goodsName}} </div>
        <div class="goods-price">{{goodsPrice | moneyFilter}} </div>
    </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  props: ["goodsImage", "goodsName", "goodsPrice",'goodsId'],
  methods:{
    goGoodsPage(){
      this.$router.push({name:"Goods",query:{goodsId:this.goodsId}})
    }

  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-info{
  border:1px solid #eeeeee;
  box-sizing: border-box;
}
</style>