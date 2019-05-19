let express = require('express')
let app = express()
const server=require('http').Server(app)
const io=require('socket.io')(server)
io.on('connection',function(socket){
    console.log('what??')
    socket.on('send',function(data){
        console.log(data)
        // const {from,to,content}=data
        // const chatid=[from,to].sort().join('_')
        // Chat.create({chatid,from,to,content},function(err,data){
        //     io.emit('recieve'+to,Object.assign({},data._doc))
        // })
    })
})
server.listen(3001,()=>console.log("express is running..."))