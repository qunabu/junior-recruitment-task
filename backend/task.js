const mongoose = require('mongoose');


const Schema = mongoose.Schema;

let Task = new Schema({
    content: {
        type: String
    },
    finished: {
        type: Boolean 
    }

});

module.exports = mongoose.model('Task', Task);