const http = require('http').createServer();
const port = 3000

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let userList = [];

let userCount = 0

io.on('connection', (socket) => {
    console.log('a user connected');
    userCount++;
    socket.broadcast.emit("connected", userCount);
    
    socket.on('disconnect', (message) => {
        console.log('user disconnected');
        io.emit('dc', userCount);
        // remove user from userList
        console.log(message)
        userList = userList.filter(user => user !== message.userName);
        userCount--;
        console.log(userList);
    });

    socket.once('message', (message) => {
        console.log(message);
        userList.push(message.userName);
    })

    socket.on('message', (message) => {
        console.log(userList);
        message['userCount'] = userCount;
        //console.log(message);
        socket.broadcast.emit('message', message);

    });

});




http.listen(port, () => console.log('listening on http://localhost:8080'));