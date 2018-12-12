<template>
    <div>
        <swiper :options="swiperOption" class="swiper">
            <swiper-slide class="text">
                <div></div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
    export default {
        data(){
            return{
                swiperOption:{
                    direction:'vertical',
                    slidesPerView:'auto',
                    freeMode:true, //每次只滑动一块  默认为false 
                    mousewheel:true     
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

</style>