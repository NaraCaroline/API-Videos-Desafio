const VideoController = require('./controllers/VideoController.js')
const CategoriaController = require('./controllers/CategoriaController.js')
const UserController = require('./controllers/UserController.js')
const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const VideosMiddleware = require('./Middleware/VideosMiddleware.js');
const CategoriasMiddleware = require('./Middleware/CategoriasMiddleware.js');

routes.use(bodyParser.json()) // for parsing application/json
routes.use(bodyParser.urlencoded({ extended: false }))


// Rotas 
routes.get('/',(req, res) => {
    return res.status(200).send('O servidor está funcionando!!!')
})

routes.post('/add', (req,res) => {
    const body = req.body;

    if(!body)
        return res.status(400).end()

    db.push(body)
    return res.json(body)
})


//Rotas de acesso para os vídeos

routes.get('/videos', VideoController.index)
routes.get ('/videos/busca', VideoController.filter)
routes.post('/videos', VideoController.store)
routes.put('/videos/:id', VideosMiddleware.validateId, VideoController.update); 
routes.delete('/videos/:id', VideosMiddleware.validateId, VideoController.delete); 


//Rotas de acesso para as categorias
routes.get('/categorias', CategoriaController.index)
routes.post('/categorias', CategoriaController.store)
routes.put('/categorias/:id', CategoriasMiddleware.validateId, CategoriaController.update); 
routes.delete('/categorias/:id', CategoriasMiddleware.validateId, CategoriaController.delete); 

//Rotas de acesso para os usurários
routes.get('/user', UserController.index)
routes.post('/user', UserController.store)
routes.delete('/user/:userId', UserController.delete); 


module.exports = routes; 
