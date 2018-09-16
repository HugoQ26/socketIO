var socket = io();

socket.on('connect', function() {
    console.log("conected to server2");


    socket.emit('createMessage', {
        to: 'filip',
        text: 'hey you too'
    })
    
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
    
});



socket.on('newMessage', function(message) {
    console.log('new message: ', message);    
})