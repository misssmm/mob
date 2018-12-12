<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" class="location-icon" width="100%">
                </van-col>
                <van-col span="17">
                    <input type="text" class="search-input" placeholder="查找">
                </van-col>
                <van-col span="4">
                    <img :src="searchIcon" class="search-icon">
                </van-col>
            </van-row>
        </div>

        <div class="swiper-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(baner, index) in bannerPicArray" :key="index">
                    <img v-lazy="baner.image" width="100%" />
                </van-swipe-item>
            </van-swipe>
        </div>

        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" alt="" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>

        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" alt="" width="100%">
        </div>

        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item ,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" alt="" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice}}) </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        
        <floorcomponent :floorData="this.floor1" :floorTitle="floorName.floor1"></floorcomponent>
        <floorcomponent :floorData="this.floor2" :floorTitle="floorName.floor2"></floorcomponent>
        <floorcomponent :floorData="this.floor3" :floorTitle="floorName.floor3"></floorcomponent>

        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <!-- van-list 实现下拉加载的功能 -->
                <van-list>   
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import floorcomponent from '@/components/component/floorcomponent'
import goodsInfo from '@/components/component/goodsInfoComponent'
import {toMoney} from '@/filter/moneyFilter'
import url from '@/serviceAPI.config'

export default {
  components:{
      swiper,
      swiperSlide,
      floorcomponent,
      goodsInfo
  },
  data() {
    return {
      swiperOption:{
          slidesPerView:3
        //   pagination:{
        //     el:'.swiper-pagination'
        //   }
      },
      msg: "shopping mall",
      locationIcon: require("../../assets/images/location.png"),
      searchIcon: require("../../assets/images/search.png"),
      bannerPicArray: [],  //轮播图
      category:[],          //商品类别
      adBanner:'',          //广告图片
      recommendGoods:[],    //推荐商品
      floor1:[],            //楼层数据
      floor2:[],
      floor3:[],
      floorName:{},          //楼层title
      hotGoods:[],           //热卖商品
    };
  },
  created(){
      axios({
          url:url.getShoppingMallInfo,
          method:'get'
      })
      .then(res=>{
        
        if (res.status==200) {
            console.log(res.data)
            this.category=res.data.data.category
            this.adBanner=res.data.data.advertesPicture
            this.bannerPicArray=res.data.data.slides
            this.recommendGoods=res.data.data.recommend
            this.floor1=res.data.data.floor1
            this.floor2=res.data.data.floor2
            this.floor3=res.data.data.floor3 
            this.floorName=res.data.data.floorName
            this.hotGoods=res.data.data.hotGoods
        }
     
      })
      .catch(err=>{
          console.log(err)
      })
  },
  filters:{
      moneyFilter(money){
        return toMoney(money)
      }
  }

};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-width: 0px 0px 1px 0px;
  background-color: #e5017d;
  border-bottom: 1px solid #ffffff !important;
}
.location-icon {
  padding-top: 0.4rem;
  padding-left: 0.3rem;
  width: 1.5rem;
}
.search-icon {
  width: 1.5rem;
  padding-left: 0.6rem;
  padding-top: 0.4rem;
}
.swiper-area{
    max-height: 15rem;
    clear:both;
    overflow: hidden;
}
.type-bar{
    background-color: #ffffff;
    margin: 0 .3rem .5rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
      flex: 1;
}
.recommend-area{
    background-color: #ffffff;
    margin-top: .3rem;
}
.recommend-title{
    border-bottom: 1px solid #eeeeee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;
}
.recommend-body{
    border-bottom: 1px solid #eeeeee;
}
.recommend-item{
    width: 99%;
    border-right: 1px solid #eeeeee;
    font-size: 12px;
    text-align: center;
}
.hot-area{
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
}
.hot-goods{
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
}
</style>
