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
        // Ignore messages from sockets that never joined, and empty messages
        if(!idMap[socket.id] || typeof mss !== "string" || !mss.trim()) return
        console.log(`This user ${socket.id} send message is : ${mss}`)
        io.emit("recive-mss",{message : mss,userId : socket.id,userName : idMap[socket.id]})
    })
    socket.on("newUser",async (user)=>{
        if(typeof user !== "string" || !user.trim()) return
        user = user.trim()
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
        delete idMap[socket.id]
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

const PORT = process.env.PORT || 4000
server.listen(PORT,()=>{
    console.log(`Server run on port ${PORT}`);
})