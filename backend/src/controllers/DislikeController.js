const dev = require('../models/Developer')

module.exports = {
   async store(req, res) {
       const { devId } = req.params
       const { user } = req.headers

       console.log('userId = ' + user)
       console.log('devId = ' + devId)

       const userDb = await dev.findById(user)
       const devDb = await dev.findById(devId)

       if (!devDb) {
           return res.status(400).json( { error: "Developer does not exists!" })
       }

       userDb.dislikes.push(devDb._id)
       await userDb.save()

       return res.status(201).json(userDb)
    }
}