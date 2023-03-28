

const express= require("express");

const app=express();


const http=require("http");
const server=http.createServer(app);
const {Server}=require("socket.io");
const io=new Server(server);
  

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html")
  });
  // io.on("connection",(socket)=>{
  //   console.log("a user connected")
  
  //   socket.on('chat message', (msg) => {
  //     console.log('message: ' + msg);
  //   });
  // });
  let users={};


 

io.on("connection",(socket)=>{
  
  socket.on("name",(name)=>{
    if(name!="" && name!=null){
    users[socket.id]=name;
    socket.emit("bye", users)
    }
    console.log(`${name} is connected`);
    
    
  
  })
  

socket.on('chat message', (msg) => {

    socket.broadcast.emit('chat message', msg);

  });

 




  socket.on('disconnect', () => {
    console.log(users[socket.id]+' disconnected');
  });


});




server.listen(3000,()=>{
    console.log("listening");
})
