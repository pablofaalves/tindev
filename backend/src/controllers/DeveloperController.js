const axios = require('axios')
const dev = require('../models/Developer')

module.exports = {
    async store(req, res) {
        const { username: user} = req.body
        const existingUser = await dev.findOne({ user })

        if (existingUser) {
            return res.json({ error : "User Already Exists!!!", user: existingUser } )
        }

        const response  = await axios.get(`https://api.github.com/users/${user}`) 
        const { name, bio, avatar_url: avatar} = response.data
        const createdDev = await dev.create({
            name,
            user,
            bio,
            avatar
        })

        return res.status(201).json({ user: createdDev })
    },

    async index(req, res) {
        const { user } = req.headers
        
        if (user === '') {
            return res.status(400)
        }

        const userDb = await dev.findById(user)

        if (!userDb) {
            return res.status(404)
        } 
        
        const devsList = await dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: userDb.likes }},
                { _id: { $nin: userDb.dislikes }}
            ]
        })
        
        res.json(devsList)
    },

    async getById(req, res) {
        const userDb = await dev.findById(req.params.devId);
        return !userDb ? res.status(404) : res.json(userDb);
    }
}