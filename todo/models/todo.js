//structure of todo schema
const mongoose = require("mongoose")
//in JSON format stored in DB
const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },

});

module.exports = new mongoose.model("Todo",TodoSchema);
