var socket = io();

socket.on('connect', function() {
    console.log("conected to server2");


    // socket.emit('createMessage', {
    //     from: 'filip',
    //     text: 'hey you too'
    // })
    
});

socket.on('welcomeMessage', function(message) {
    console.log(message);    
    $('#messages').append(`<li>${message.from}: ${message.text} </li>`) 
})

socket.on('newUser', function(message) {
    console.log(message); 
    $('#messages').append(`<li>${message.from}: ${message.text} </li>`)    
})

socket.on('disconnect', function() {
    console.log('Disconnected from server');
    
});



socket.on('newMessage', function(message) {
    console.log('new message: ', message);
    $('#messages').append(`<li>${message.from}: ${message.text} </li>`)    
})

// socket.emit('createMessage', {
//         from: 'Filip',
//         text: 'hey you too'
//     }, function(data) {
//         console.log('Got it', data);
        
//     })

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    
    socket.emit('createMessage', {
        from: 'Filip',
        text: $('[name = "message"]').val()
    }, function(data) {
        console.log('Got it', data);
        
    })
    $('[name = "message"]').val("");
})