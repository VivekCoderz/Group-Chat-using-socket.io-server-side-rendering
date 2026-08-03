const express = require("express")
const app = express()
const socketio = require("socket.io")
const http = require("http")
const path = require("path")

app.use(express.static(path.join(__dirname,"public")))
const server = http.createServer(app)
const io = socketio(server)


const idMap = {}
io.on('connection',(socket)=>{
    console.log("User is connected ",socket.id)
    socket.on("send-mss",(mss)=>{
        console.log(`This user ${socket.id} send message is : ${mss}`)
        io.emit("recive-mss",{message : mss,userId : socket.id,userName : idMap[socket.id]})
    })
    socket.on("newUser",async (user)=>{
        console.log(`${user} is online`)
        idMap[socket.id] = user
        const activeUsers = []
        const sockerId = await io.fetchSockets();
        sockerId.forEach(e=>{
            if(idMap[e.id]){
                activeUsers.push(idMap[e.id])
            }
        })
        io.emit("join-user",{users : activeUsers,totalUsers : activeUsers.length})
    })
    socket.on("disconnect",async()=>{
        console.log(`A user is left`)
        const activeUsers = []
        const sockerId = await io.fetchSockets();
        sockerId.forEach(e=>{
            if(idMap[e.id]){
                activeUsers.push(idMap[e.id])
            }
        })
        io.emit("left-user",{users : activeUsers,totalUsers : activeUsers.length})

    })
})

server.listen(4000,()=>{
    console.log("Server run on port 4000");
})