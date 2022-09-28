const http = require('http').createServer();
const port = 3000

require( 'console-stamp' )( console );

const io = require('socket.io')(http, {
    rejectUnauthorized: false,
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

    socket.on('message', (message) => {
        if(Object.keys(message.user).length == 1) return;
        console.log(userCount)
        if(userCount == 1){
            userList.push(message.user)
        } else if (userCount == 2){
            const indexnum = userList.map(e =>e.ID ).indexOf(message.user.ID);
            console.log(indexnum)
            //const indexnum = userList.indexOf(message.user.ID)
            //console.log(userList, message.user)
           // console.log(indexnum)
            if ( indexnum == -1 ){
                userList.push(message.user)
                //console.log(message)
            }

        }
        console.log(userList)

        message['userCount'] = userCount;
        // console.log(message);
        socket.broadcast.emit('message', message);

    });

});




http.listen(port, () => console.log('listening on http://localhost:8080'));