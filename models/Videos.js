const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const Categoria = require('../models/Categorias.js');
const bcrypt = require('bcrypt');

const videoSchema = new mongoose.Schema({
_id :{
    type: String,
    required: true,
},

title:{
    type: String,
    required: true,
},

url:{
    type: String,
    required: true,
},

 categoria:{
    /* type:  mongoose.Schema.Types.ObjectId,
    ref: 'categoriaSchema', */
    type: String,
    required: true, 
    
},
desc:{
    type: String,
    required: false,
},

likes :{
    type: Number,
    required: false,
},

});


module.exports = mongoose.model("Video", videoSchema);