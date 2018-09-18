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


function notifyMe(from, text) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {
          var options = {
                  body: text
                //   icon: "icon.jpg",
                  
               };
            var notification = new Notification(from ,options);
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (!('permission' in Notification)) {
          Notification.permission = permission;
        }
      
        if (permission === "granted") {
          var options = {
                body: text
                // icon: "icon.jpg",
                
            };
          var notification = new Notification(from, options);
        }
      });
    }
  }




socket.on('newMessage', function(message) {
    var formatedTime = moment(message.createdAt).format("HH:mm")
    notifyMe(message.from, message.text);
    
    console.log('new message: ', message);
    $('#messages').append(`<li>${message.from} ${formatedTime}: ${message.text} </li>`)    
})


socket.on('newLocationMessage', function(locationMessage) {
    var formatedTime = moment(locationMessage.createdAt).format("HH:mm")
    notifyMe(locationMessage.from, locationMessage.url);
    $('#messages').append(`<li>${locationMessage.from} ${formatedTime}: <a href="${locationMessage.url}" target="_blank" rel="noopener noreferrer">Click to view my position</a></li>`)

})


var $messageTextbox = $('[name = "message"]')

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'Filip',
        text: $('[name = "message"]').val()
    }, function(data) {
        console.log('Got it', data);
        $messageTextbox.val("")
    })    
})

var locationButton = $("button#send-location");

locationButton.on("click", function(){
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }

    locationButton.attr('disabled', 'true').text('Sending location...');
    
    navigator.geolocation.getCurrentPosition(function(position) {
       
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function(){   
            locationButton.removeAttr('disabled').text('Send location');
        })
        
        
    }, function() {
        locationButton.removeAttr('disabled');
        alert('Unable to fetch location');
    })

})
