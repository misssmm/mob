<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"/>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>    
                            <!-- 给DOM动态添加class  ?????????? -->
                            <li 
                                v-for="(item,index) in category" 
                                :key="index" @click="clickCategory(index,item.ID)"
                                :class="{categoryActive:categoryIndex==index}"
                            >
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="clickCategorySub">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"> 
                            </van-tab>
                        </van-tabs>
                    </div>

                    <div id="list-div">
                        <!-- v-model 绑定的值会映射到data中 v-on:refresh -->
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list
                                v-model="loading"
                                :finished="finished"
                                @load="onLoad"
                            >
                                <div 
                                    class="list-item" 
                                    v-for="(item,index) in goodList" 
                                    :key="index"
                                    @click="goGoodsInfo(item.ID)"
                                >
                                    <div class="list-item-img"><img :src="item.IMAGE1" :onerror="errorImg" alt="" width="100%"> </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}} </div>
                                        <div>￥{{item.ORI_PRICE|moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>

       
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0,
      list: [],
      loading: false, //上拉加载使用
      finished: false, //下拉加载是否没有数据了
      isRefresh: false,
      page: 1, //商品列表的信息
      goodList: [], //商品信息
      categorySubId: "", //商品子分类的ID
      errorImg: 'this.src="' + require("@/assets/images/timg.png") + '"'
    };
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 + "px";
    document.getElementById("list-div").style.height = winHeight - 90-50 + "px";
  },
  created() {
    this.getCategory();
  },
  methods: {
    goGoodsInfo(id) {
      this.$router.push({ name: "Goods", params: { goodsId: id } });
    },
    getCategory() {
      //获取大的商品类别
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            // console.log(this.category[0].ID)
            this.getCategorySubByCategoryId(this.category[0].ID); //首次加载的时候显示第一个
          } else {
            Toast("服务器错误");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCategorySubByCategoryId(categoryId) {
      //把点击大类的ID 传到后台
      // 根据大类ID读取小类类别列表
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId: categoryId }
      })
        .then(response => {
          //console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0;
            //从新加载页面信息
            this.categorySubId = this.categorySub[0].ID
            this.onLoad()
          } else {
            Toast("服务器错误");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickCategory(index, categoryId) {
      //点击大类方法
      //console.log(categoryId);
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    clickCategorySub(index, title) {
      //点击子类方法
      this.categorySubId = this.categorySub[index].ID;
    //  console.log(this.categorySubId);

      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          //console.log(response);
          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            //message应该是每页的信息
            this.goodList = this.goodList.concat(response.data.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
       //   console.log(this.finished);
        })
        .catch(error => {
          console.log(error);
        });
    },

    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.list = [];
        this.onLoad();
      }, 500);
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
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #ffffff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>