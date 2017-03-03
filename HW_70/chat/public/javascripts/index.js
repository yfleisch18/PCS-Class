(function () {
    'use strict';

    const socket = io(); // io.connect('localhost:80')

    // listen for 'message' events from server
    const messageForm = $('#messageForm'),
        messagesDiv = $('#messages'),
        messageInput = $('#message'),
        passwordForm = $('#passwordForm'),
        nameInput = $('#nameInput'),
        refresh = $('#refresh');
    var name = '',
        rfrsh = false;

    passwordForm.submit(e => {
        e.preventDefault();
        passwordForm.hide();
        name = nameInput.val();
        // localStorage.index = 0;
        socket.emit('passwordComplete', name);
        $('#chatStuff').show();
        nameInput.val('');

    });
    socket.on('message', msg => {
        // if (msg.index > 0 && localStorage.index < msg.index - 1) {
        //     socket.emit('refresh', localStorage.index);
        // }
        const span = $('<span id="serverMessage">(' + msg.name + ')</span><span id="serverContent">' + msg.message + '</span>').appendTo(messagesDiv);
        // localStorage.index += 1;
        $('#messages').scrollTop($('#messages')[0].scrollHeight);
    });

    // send a 'message' event to server
    // socket.emit('message', { msg: 'Hello Socket IO' });
    refresh.click(function () {
        socket.emit('refresh', { rfrsh: true });
        rfrsh = true;
        console.log('after refreshed');
    });

    socket.on('refresh', data => {
        console.log(data.allMessages);
        if (data.allMessages) {
            $('#messages').empty();
            for (var i = 0; i < data.allMessages.length; i++) {
                $('<span id="serverMessage">(' + data.allMessages[i].name + ')</span><span id="serverContent">' + data.allMessages[i].message + '</span>').appendTo(messagesDiv);
                $('#messages').scrollTop($('#messages')[0].scrollHeight);
            }
            rfrsh = false;
        }
    });
    messageForm.submit(e => {
        e.preventDefault();
        console.log('hi');
        console.log(name);
        socket.emit('message', { name: name, message: messageInput.val() });
        messageInput.val('');
    });
}());