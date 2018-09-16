const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);
var number2 = 1;
io.on('connection', (socket)=>{
    console.log(number2++, " users connected");

    socket.emit("welcomeMessage", {
        from: "Admin",
        text: 'Welcome to chat app'
    })

    socket.broadcast.emit("newUser", {
        from: "Admin",
        text: 'New user joined',
        joinedAt: new Date().toLocaleString()
    })



    // socket.emit('newMessage', {
    //     from: 'hugo',
    //     text: 'hello girl',
    //     createAt: new Date().toLocaleString()
    // })

    

    socket.on('createMessage', (message)=> {  //emits event to single connection
        console.log('createMessage: ', message);
        io.emit('newMessage', {    //emits event to avery single connection
            from: message.from,
            text: message.text,
            createAt: new Date().toLocaleDateString()
        });

        // socket.broadcast.emit('newMessage', {    //emits event to everyone except this socket
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().toLocaleDateString()
        // });

    });

    socket.on('disconnect', ()=> {
        console.log('Client disconected');
        number2--
        
    })
    
})

server.listen(port, ()=>{
    console.log('Server is running on port '+ port);
})

