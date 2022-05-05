const {response} = require('express');
const res = require('express/lib/response');
const {v4 : uuid} = require('uuid');
const Categoria = require('../models/Categorias.js');
const { findById } = require('../models/Categorias.js');
const mongoose = require('mongoose');
 
module.exports ={
// para visualizar os dados
    async  index(request,response){
        try{
            const categorias = await Categoria.find();
            return response.status(200).json({categorias});
        } catch (err) {
            response.status(500).json({error: err.mesage});
        }
    },
// para adicionar alguma categoria post
    async  store (request,response){
     const {title, color} = request.body;
    
     if(!title){
        return response.status(400).json({ error : 'Title  missing'})
     }

     const categoria = new Categoria({
        _id: uuid(),
        title,
        color,
        

     })

     try{
         await categoria.save();
         return response.status(201).json( {message : 'categoria add sucessfully'})
     }catch (err){
         response.status(400).json({ error: err.mensage})
     }
    },
 
// para atualizar algum vídeo
    async update(request,response){
        const { title, color } = request.body;

        if(!title && !color) {
            return response.status(400).json({error: "You must inform a new title or a new link, a new data!"});
        }
        if(title) response.categoria.title = title;
        if(color) response.categoria.color = color;
  
        
        try {
            await response.categoria.save();
            return response.status(200).json({message: "Categoria updated Successfully!"})

        }catch(err){
            response.status(500).json({error: err.message});
        }
    },
 // função delete para deletar alguma categoria
    async delete(request, response){
        try{
            await response.categoria.remove()
            return response.status(200).json({message: "Deletado com sucesso"})
        }catch(err){
            return response.status(500).json({ error : err.message})
        }
    }
};


