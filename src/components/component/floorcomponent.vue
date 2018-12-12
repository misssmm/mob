<template>
    <div>
        <div class="floor">
            <div class="floor-title">{{floorTitle}}</div>
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img :src="floorData0.image" alt="" width="100%">
                </div>
                <div class="floor-two">
                    <div class="floor-two1"><img :src="floorData1.image" alt="" width="100%"></div>
                    <div><img :src="floorData2.image" alt="" width="100%"></div>
                </div>
            </div>
            <div class="floor-rule">
                <div v-for="(item,index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" alt="" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['floorData','floorTitle'],
    data(){
        return{
            floorData0:{},
            floorData1:{},
            floorData2:{},
        }
    },
    created(){ //还未得到数据

    },
    watch:{
        floorData:function(val){
            this.floorData0=this.floorData[0]
            this.floorData1=this.floorData[1]
            this.floorData2=this.floorData[2]
        }
    }
};
</script>

<style scoped>
.floor{
    font-size: 0px;
}
.floor-title{
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: 14px;
    text-align: center;
    background-color: #F0F0F5;
    border: 1px solid #eeeeee;
    border-radius: 50%;
}
.floor-anomaly{
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    border-bottom: 1px solid red;
}
.floor-anomaly div{
    width: 10rem;

    box-sizing: border-box;
    -webkit-box-sizing:border-box;
}
.floor-one{
    border-right: 1px solid red;
}
.floor-two1{
    border-bottom: 1px solid red;
}
.floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #ffffff;
}
.floor-rule div{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid red;
}
.floor-rule div:nth-child(odd){
    border-right: 1px solid red;
}
</style>