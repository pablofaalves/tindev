const dev = require('../models/Developer')
const db_connection = require('../database/connection');

module.exports = {
   async store(req, res) {
       const { devId } = req.params
       const { user } = req.headers

       const userDb = await dev.findById(user)
       const devDb = await dev.findById(devId)

       if (!devDb) {
           return res.status(400).json( { error: "Developer does not exists!" })
       }

       // It's a match
       if (devDb.likes.includes(userDb._id)) {

            console.log(socketLikedDev + ' | ' + socketLoggedUser);

            const socketLikedDev = await db_connection('websockets')
                .select('socketId')
                .where('userId', devDb.user)

            const socketLoggedUser = await db_connection('websockets')
                .select('socketId')
                .where('userId', userDb.user)

           
            if (socketLikedDev) { 
                req.websocket_io.to(socketLoggedUser).emit('match', devDb)
            }

            if (socketLoggedUser) { 
                req.websocket_io.to(socketLikedDev).emit('match', userDb)
            }
       }

       userDb.likes.push(devDb._id)
       await userDb.save()

       return res.status(201).json(userDb)
    }
}