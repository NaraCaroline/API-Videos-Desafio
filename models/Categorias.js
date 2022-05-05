const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const categoriaSchema = new mongoose.Schema({
_id :{
    type: String,
    required: true,
},

title:{
    type: String,
    required: true,
},

color:{
    type: String,
    required: false,
},



});

module.exports = mongoose.model("Categoria", categoriaSchema);