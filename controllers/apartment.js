const express = require('express');
const passport = require('../config/ppConfig');
const router = express.Router();

// import database
const db = require('../models');


// GET students Index
//localhost:4000/students
router.get('/', async(req, res) => {
    try{
      const foundApartment = await db.apartment.findAll()
      res.render('apartments/index.ejs', {
        apartments: foundApartment,
      });
    }catch(e){
       console.log(e)
     
    }
  });

router.post('/', async(req, res) => {
    try {
      console.log(req.body);
      const createdApartment = await db.apartment.create(req.body)
      console.log('Created Apartment = ', createdApartment);
      res.redirect('/apartment');
    } catch(e) {
      console.log(e.message)
    }
  });
  
  
  
  // GET Dogs New
  //localhost:4000/dogs/new
  //for showing the form
  router.get('/profile', (req, res) => {
    res.render('profile.ejs');
  });
  


module.exports = router;