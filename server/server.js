const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);
var number2 = 1;





io.on('connection', (socket)=>{
    console.log(number2++, " users connected");

    socket.emit("welcomeMessage", generateMessage('Admin', 'Welcome to the chat app'))

    socket.broadcast.emit("newUser", generateMessage('Admin', 'New user joined'));



    // socket.emit('newMessage', {
    //     from: 'hugo',
    //     text: 'hello girl',
    //     createAt: new Date().toLocaleString()
    // })

    

    socket.on('createMessage', (message, callback)=> {  //emits event to single connection
        console.log('createMessage: ', message);
        io.emit('newMessage', {    //emits event to avery single connection
            from: message.from,
            text: message.text,
            createAt: new Date().toLocaleDateString()
        });

        callback('What a hell is going on');
        // socket.broadcast.emit('newMessage', {    //emits event to everyone except this socket
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().toLocaleDateString()
        // });

    });

    socket.on('createLocationMessage', (location)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', location.latitude, location.longitude))
        
    });

    socket.on('disconnect', ()=> {
        console.log('Client disconected');
        number2--
        
    })
    
})

server.listen(port, ()=>{
    console.log('Server is running on port '+ port);
})

