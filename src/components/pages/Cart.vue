<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="购物车"/>
        </div>
        <div class="cart-list">
            <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="pang-img"><img :src="item.image" width="100%" /></div>
                <div class="pang-text">
                    <div class="pang-goods-name">{{item.Name}}</div>
                        <div class="pang-control">
                        <van-stepper v-model="item.count" />
                    </div>
                </div>
                <div class="pang-goods-price">
                    <div>￥{{item.price|moneyFilter}}</div>
                    <div>✖{{item.count}}</div>
                    <div class="allPrice">
                        ￥{{item.price*item.count|moneyFilter}}
                    </div>
                </div>

                <div class="totalMoney">
                    商品总价:￥{{totalMoney|moneyFilter}}
                </div>
            </div>
        </div>
        <div class="cart-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
    </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false
    };
  },
  created() {
    this.getCartInfo();
  },
  methods: {
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);

        console.log(" this.cartInfo:" + JSON.stringify(this.cartInfo));
        this.isEmpty = this.cartInfo.length > 0 ? true : false;
      }
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  },
  computed:{
      totalMoney(){
          let allMoney=0
          this.cartInfo.forEach((item,index)=>{
              allMoney+=item.price*item.count
          })
          localStorage.cartInfo=JSON.stringify(this.cartInfo)

          return allMoney
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
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: right;
}
.totalMoney{
    text-align: right;
    background-color: #fff;
     border-bottom:1px solid #E4E7ED;
     padding: 5px;
}
</style>