
const { response } = require("express");
const res = require("express/lib/response");
const { validate: isUuid } = require("uuid");
const Categoria = require("../models/Categorias.js");

module.exports = {
    async validateId(request, response, next) {
        const { id } = request.params

        if(!isUuid(id)) {
            return response.status(400).json({error: "Invalid ID."})
        }

        try {
            const categoria = await Categoria.findById(id);
            response.categoria = categoria;
            if(!categoria) {
                return response.status(404).json({ error: "Categoria not found." })
            }
        }catch (err) {
            return response.status(500).json({ error: err.message });
        }

        next()
    }
}
