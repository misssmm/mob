const mongooes=require('mongoose')

const Schema=mongooes.Schema

const categorySubSchema=Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_ID:{type:String},
    MALL_SUB_NAME:{type:String},
    COMMENTS:{type:String},
    SORT:{type:Number}
})

mongooes.model('CategorySub',categorySubSchema)