const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
const bcrypt = require ("bcrypt")


const User = require ("./models/Usuario")

router.post('/signup', (req,res,next) => {
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
} )

router.delete("/:userId", (req,res, next) => {
    User.remove({ _id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            massage: "Usuário deletado com sucesso!"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json ({
            error: err
        })
    })
})

module.exports = router

