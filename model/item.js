const mongoose = require('mongoose')


const itemSchema = new mongoose.Schema({
    name:{
        type: String
    },
    image:{
        type: String
    },
    isActive:{
        type: Boolean,
        default: true
    },
    numOfStudets:{
        type: Number
    },
    contact:{
        type: Number
    },
    courseTitle:{
        type: String
    },
    address:{
        type: String
    },
    status:{
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model("items",itemSchema )