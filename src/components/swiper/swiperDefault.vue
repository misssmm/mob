<template>
    <div>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
                Slide{{item}}
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
    export default {
        data (){
            return{
                slide:[1,2,3,4,5,6],
                swiperOption:{
                    direction:'vertical',
                    loop:true, //循环
                    pagination:{
                        el:'.swiper-pagination',
                        clickable:true,//可点击圆点切换
                    }
                }
            }
        },
        components:{
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped>
.swiper-slide{
    height: 4rem;
    text-align: center;
    line-height: 4rem;
    border-bottom:1px solid #eeeeee;
}
.swiper{
    height: 7rem;
}
</style>