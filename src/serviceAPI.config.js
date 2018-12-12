// 管理接口的文件

const BASEURL="https://www.easy-mock.com/mock/5be9446778639569f0fbe8a4/index/"
const LOCALURL="http://localhost:3100/"

const URL={  //各个接口
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',  //用户注册的接口  后端接口
    login:LOCALURL+'user/login',
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',   //每个商品的详细信息
    getCategoryList:LOCALURL+'goods/getCategoryList',  //所有商品的大类别
    getCategorySubList:LOCALURL+'goods/getCategorySubList', //  小类
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubId'   //得到小类里的信息
}

module.exports=URL