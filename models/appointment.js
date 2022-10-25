//Import mongoose
const mongoose = require('mongoose')

//Define a schema for appointment
var appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        required: 'email is required'
    },
    date: {
        type: String,
        required: 'Date is required'
    },
    reason: {
        type: String,
        required: 'Reason is required'
    },
    confirmed:{
        type: String
    }
})

//Make public
module.exports = mongoose.model('Appointment', appointmentSchema)