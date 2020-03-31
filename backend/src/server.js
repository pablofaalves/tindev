const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIO = require('socket.io');

const routes = require('./routes');
const websocket_cfg = require('./websocket_config')
const db_connection = require('./database/connection');

const app = express();
const server = require('http').Server(app);
const io = socketIO(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-app-ug9xu.mongodb.net/test?retryWrites=true&w=majority',
 {
     useNewUrlParser: true
 });

 app.use((req, res, next) => {
     req.websocket_io = io;
     return next();
 });

app.use(cors());
app.use(express.json());
app.use(routes);

io.on('connection', async socket => {
    const { userId } = socket.handshake.query;

    let creation_timestamp = Date.now();
    let socketId = socket.id;
    console.log(socketId + ' | ' + userId);

    await db_connection('websockets').where('userId', userId).del();

    const listReturn = await db_connection('websockets').select('*');
    console.log(listReturn.length);
    await db_connection('websockets').insert({
        userId,
        socketId,
        creation_timestamp
    })
});

server.listen(3333);