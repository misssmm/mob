//中间件 插件先use      设置路由 装载子路由  初始化连接
const Koa=require('koa')
const Router=require('koa-router')
let user=require('./appApiC/User')
let goods=require('./appApiC/Goods')
const bodyParser=require('koa-bodyparser')
const cors=require('koa2-cors')
const mongooes=require('mongoose')

const {connect,initSchemas} =require('./database/init')


const app=new Koa()

;(async()=>{
  await connect()
  initSchemas()
})()



app.use(bodyParser())   //接收前端的请求/参数等   类似node中的formidable
app.use(cors())         //前后端分离项目中跨域问题的解决


//装载子路由   各个模块的路由
let router =new Router()
router.use('/user',user.routes())   //这里有个/user层级
router.use('/goods',goods.routes())



//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3100,()=>{
  console.log('server start at port 3100')
})