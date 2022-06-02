const express = require('express')
const app = express()
const http = require('http').createServer(app);
const port = 3000

const cors = require('cors');

app.use(cors({
  origin: { origin: "*" }
}));

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let userCount = 0


io.on('connection', (socket) => {
    console.log('a user connected');
    userCount++;
    socket.broadcast.emit("connected", userCount);
    app.get('/count', (req, res) => {
        res.send(userCount.toString());
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('dc', userCount);
        userCount--;
    });

    socket.on('message', (message) => {
        message['userCount'] = userCount;
        console.log(message);
        socket.broadcast.emit('message', message);

    });

});




http.listen(port, () => console.log('listening on http://localhost:8080'));