const devController = require('./controllers/DeveloperController')
const likeController = require('./controllers/LikeController')
const dislikeController = require('./controllers/DislikeController')
const routes = require('express').Router()

routes.get('/devs', devController.index)
routes.get('/devs/:devId', devController.getById)
routes.post('/devs', devController.store)
routes.post('/devs/:devId/likes', likeController.store)
routes.post('/devs/:devId/dislikes', dislikeController.store)

module.exports = routes