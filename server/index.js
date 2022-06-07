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
        //remove user from userList from ID
        userList = userList.filter(user => user.ID !== socket.id);
        userCount--;
        console.log(userList);
    });

    socket.once('message', (message) => {
        console.log(message);
        userList.push(message.user);
    })

    socket.on('message', (message) => {
        //console.log(socket.id)
        //console.log(userList);
        //find the index of the user in the userList
        let userIndex = userList.findIndex(user => user.ID === socket.id);
        console.log(userList.userName[message.user.userName])
        message['userCount'] = userCount;
        console.log(message);
        socket.broadcast.emit('message', message);

    });

});




http.listen(port, () => console.log('listening on http://localhost:8080'));