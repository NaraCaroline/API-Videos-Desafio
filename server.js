
//ativando as bibliotecas e frameworks para ajudar na construção da aplicação
const express = require('express');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require("./routes.js")
const VideoController = require('./controllers/VideoController.js')
const CategoriaController = require('./controllers/CategoriaController.js')

const userRoutes = require('./user.js')

dotenv.config();

//iniciando o uso das bibiliotecas
 const app = express();
 app.use(routes);
 app.use(express.json());
 const PORT = 36000;

 //para a criação de usuário
app.use("/user", userRoutes)

//conexão com banco de dados Cloud(AWS) - MongoDB
mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Sucess DB_connection"))


//process.env.PORT ||

  app.listen(36000, () =>{
    console.log("Express started at http://localhost:36000")
}) 
