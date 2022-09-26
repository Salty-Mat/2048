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
        // console.log(message);
        // if (userList.length == 0){
        //     userList[0] = message.user
        // } else if (userList.length == 1){
        //     userList[1] = message.user
        // }
    })

    socket.on('message', (message) => {
        if(userCount == 1){
            userList.push(message.user)
        } else if (userCount == 2){
            const indexnum = userList.indexOf(message.user)
            console.log(userList, message.user)
            console.log(indexnum)
            if ( indexnum == -1 ){
                userList.push(message.user)
                console.log(message)
            }

        }
        //console.log(userList)


        // if (userList[0] == undefined || userList[1] == undefined) return;
        // if (userList[0] === message.user || Object.keys(userList[0]).length == 1){
        //     userList[0] = message.user
        // } else if(userList[1] === message.user || Object.keys(userList[1]).length == 1){
        //     userList[1] = message.user
        // } else if (userList[0].ID == userList[1].ID){
        //     userList.pop()
        // } else {
        //     if(userList.length == 0){
        //         userList[0] = message.user
        //     } else if (userList.length == 1) {
        //         userList[1] = message.user
        //     }
        // }
        //console.log(userList)

        //let userIndex = userList.findIndex(user => message.user.ID);

        // console.log(userIndex, userList, message.user)
        
        // if (userIndex == -1){
        //     userList.push(message.user);
        // }

        
        // for (var i = 0; i < userCount; i++){
            // console.log(message.user)
            // if(!userList[i]){
            //     console.log(!(userList[i]))
            //     if (userList[i].length == 2){D
            //         if (userList[i].ID == message.User.ID){

                        
            //         }
            //     }
                
                
            // }
            // console.log(userList)

        // }
        //console.log(socket.id)
        // console.log(userList);
        //find the index of the user in the userList
        //let userIndex = userList.findIndex(user => user.userName);
        //console.log(userIndex)
        //userList[userIndex] = message.user;
        message['userCount'] = userCount;
        // console.log(message);
        socket.broadcast.emit('message', message);

    });

});




http.listen(port, () => console.log('listening on http://localhost:8080'));