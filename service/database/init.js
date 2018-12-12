const mongoose =require('mongoose')
const db="mongodb://localhost/simle-db"   //simle-db数据库的名
const glob=require('glob')
const {resolve} = require('path')
// mongoose.Promise=global.Promise

exports.initSchemas=()=>{   //引入所有schema
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect=()=>{   //连接数据库时出现的各种情况
    //第一次连接
    mongoose.connect(db)

    let maxConnectTimes=0


    return new Promise((resolve,reject)=>{
        //连接断开时的操作
        mongoose.connection.on('disconnected',()=>{
            console.log('*********数据库断开连接***********')
            if (maxConnectTimes<3) {
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库出现问题')
            }
        })
        //数据库出现错误时的操作
        mongoose.connection.on('error',err=>{
            console.log('******数据库错误*******')
            if (maxConnectTimes<3) {
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('数据库出现问题')
            }
        })
        //链接打开时
        mongoose.connection.once('open',()=>{
            console.log('MongoDB Connected successfully!')
            resolve()
        })
    })
    
   
}