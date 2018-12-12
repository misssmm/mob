const mongoose=require('mongoose')

const Router=require('koa-router')

let router=new Router()


const fs=require('fs')

router.get('/insertAllGoodsInfo',async(ctx)=>{ //从文件中读取json数据 遍历json中的每个对象 ->存入数据库
    fs.readFile('../service/data_json/newGoods.json','utf8',function(err,data){
        data=JSON.parse(data)
        let count=0
        const Goods=mongoose.model('Goods')
        data.map((value,index)=>{
            let newGoods=new Goods(value)
            newGoods.save().then(()=>{
                count++
                console.log('成功'+count)
            }).catch(error=>{
                console.log('失败'+error)
            })
        })
    })

    ctx.body='开始导入数据'
})


router.get('/insertAllCategory',async(ctx)=>{
    fs.readFile('../service/data_json/category.json','utf8',function (err,data) {  
        data=JSON.parse(data)

        let count = 0

        const Category=mongoose.model('Category')  //先把模型引过来

        data.RECORDS.map((value,index)=>{
            let newCategory=new Category(value)
            newCategory.save().then(()=>{
                count++
                console.log('成功'+count)
            }).catch(error=>{
                console.log('失败'+error)
            })
        })
    })
    ctx.body='开始导入数据'
})

router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('../service/data_json/category_sub.json','utf8',function (err,data) {  
        data = JSON.parse(data)

        let count=0

        const CategorySub=mongoose.model('CategorySub')

        data.RECORDS.map((value,index)=>{
            let newCategorySub=new CategorySub(value)
            newCategorySub.save().then(()=>{
                count++
                console.log('成功'+count)
            }).catch(error=>{
                console.log('失败'+error)
            })
        })
    })
    ctx.body='开始导入数据'
})

/** 获取商品详细信息的接口 */
router.post('/getDetailGoodsInfo',async(ctx)=>{
    // let goodsId=ctx.request.body.goodsId
    // const Goods=mongoose.model('Goods')
    // //有这个模型才可以调用方法   M层添加的方法也是这样的方式调用
    // await Goods.findOne({ID:goodsId}).exec()
    // .then(async(result)=>{
    //     //成功了把 状态码结果返回给前台
    //     ctx.body={code:200,message:result}
    // }).catch(error=>{
    //     console.log(error)
    //     ctx.body={code:500,message:error}
    // })


    try{
        let goodsId=ctx.request.body.goodsId
        const Goods=mongoose.model('Goods')
        //有这个模型才可以调用方法   M层添加的方法也是这样的方式调用
        let result=await Goods.findOne({ID:goodsId}).exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})


router.get('/getCategoryList',async(ctx)=>{
    try{
        const Category=mongoose.model('Category')
        let result=await Category.find().exec()
        ctx.body={
            code:200,
            message:result
        }
    }catch(err){    
        ctx.body={
            code:500,
            message:err
        }
    }
})

router.post('/getCategorySubList',async(ctx)=>{
    try{   //商品类别的MALL_CATEGORY_ID 1 2 3 4 5 
        let categoryId=ctx.request.body.categoryId
        //let categoryId=1
        const CategorySub=mongoose.model('CategorySub')
        let result=await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
        ctx.body={
            code:200,
            message:result
        }
    }catch(err){    
        ctx.body={
            code:500,
            message:err
        }
    }
})

router.post('/getGoodsListByCategorySubId',async(ctx)=>{
    try{ //获取每个商品的数据
        //每类的商品通过ID把小类关联起来   类别表中的主键  商品列表中的外键
        
        let categorySubId=ctx.request.body.categorySubId
       // let categorySubId='2c9f6c946016ea9b016016f79c8e0000'
        
        let page=ctx.request.body.page
        let num=10
        let start=(page-1)*num
        const Goods=mongoose.model('Goods')
        let result =await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec()
        ctx.body={
            code:200,
            message:result
        }
    }catch(err){
        ctx.body={
            code:200,
            message:err
        }
    }
})

module.exports=router