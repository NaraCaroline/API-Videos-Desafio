const {response} = require('express');
const res = require('express/lib/response');
const {v4 : uuid} = require('uuid');
const mongoose = require('mongoose');
const express = require ("express")
const router = express.Router()
const bcrypt = require ("bcrypt")
const User = require ("../models/Usuario")

module.exports ={
// para visualizar os dados
async  index(request,response){
    try{
        const user = await User.find();
        return response.status(200).json({user});
    } catch (err) {
        response.status(500).json({error: err.mesage});
    }
},


//para salvar os dados
 async store (request,body){
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "O email já existe."
            })
        } else {
            bcrypt.hash(req.body.email, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User ({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    user
                    .save()
                    .then(result => {
                            console.log (result)
                            res.status(201).json({
                                message: 'Usuário criado!'
                            })
                        }
                    )
                    .catch( err => {
                        console.log(err)
                        res.status(500).json ({
                            error: err
                        })
                    })
                }
            })
        }
    })
    .catch()
} ,

//para deletar os dados
async delete (request,body){
    try{
        await response.user.remove({ _id: req.params.userId}).exec()
        return response.status(200).json({message: "Deletado com sucesso"})
    }catch(err){
        return response.status(500).json({ error : err.message})
    }
}
};


