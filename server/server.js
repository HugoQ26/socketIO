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

io.on('connection', (socket)=>{
    console.log("New user connected");

    

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
    });

    socket.on('disconnect', ()=> {
        console.log('Client disconected');
        
    })
    
})

server.listen(port, ()=>{
    console.log('Server is running on port '+ port);
})

