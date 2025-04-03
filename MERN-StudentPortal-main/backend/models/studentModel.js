const mongoose = require('mongoose');


const studentSchema = mongoose.Schema({
        regNo:Number,
        studentName:String,
        grade:String,

        section:{
            type:String,
            default:'A'
        },



})

module.exports = mongoose.model('Student', studentSchema)