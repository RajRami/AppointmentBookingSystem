const express = require('express')
const router = express.Router()

//Import the appoitment model class
const Appointment = require('../models/appointment')

//GET: /appointments => Display the list of appointments
router.get('/', (req, res) => {
    Appointment.find((err, appointments) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('appointments/index', {
                title: 'Appointments',
                appointments: appointments
            })
        }
    })
})

//GET: /appointments/create => Display the form to make an appointment
router.get('/create', (req, res) => {
    res.render('appointments/create', {
        title: 'Make an Appointment',
    })
})

//POST: /appointments/create => Process the form submission
router.post('/create', (req, res) => {
    //Make a new appointment based on the response
    Appointment.create(req.body, (err, newAppointment) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.json(newAppointment)
            res.redirect('/appointments')
        }
    })
})

//GET: /appointments/delete/abcd1234 => Remove the appointment 
router.get('/delete/:_id', (req, res) => {
    Appointment.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/appointments')
        }
    })
})

//GET: /appointments/edit/abcd1234 => Display the appointment details for editing
router.get('/edit/:_id', (req, res) => {

    Appointment.findById((req.params._id), (err, appointment) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('appointments/edit', {
                title: 'Edit Appointment',
                appointment: appointment
            })
        }
    })
})

//POST: /appointments/edit/abcd1234 => Process the form submission and update the appointment details
router.post('/edit/:_id', (req, res) => {
    Appointment.findByIdAndUpdate({_id:req.params._id}, req.body, null, (err, appointment) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.json(appointment)
            res.redirect('/appointments')
        }
    })
})

module.exports = router