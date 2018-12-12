const mongooes =require('mongoose')
const Schema=mongooes.Schema    //mongooes.Schema()方法
let ObjectId=Schema.Types.ObjectId    //自动生成的id
const bcrypt=require('bcrypt')  //加盐
const SALT_WORK_FACTOR=10       //加盐程度

const userSchema=new Schema({
    UserId:ObjectId,
    username:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
})


userSchema.pre('save',function(next){  //成功执行 next方法
    //加盐 加密

    bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt, (err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        }) 
    })
})

userSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}

mongooes.model('User',userSchema)
