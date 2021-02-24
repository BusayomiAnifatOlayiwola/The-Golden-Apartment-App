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
  
  // GET Dogs Show
//localhost:4000/apartment/1
router.get('/:id', async(req, res) => {
  try{
  const foundApartment = await db.apartment.findByPk(req.params.id)
  
    res.render('apartments/show.ejs', {
      apartment: foundApartment,
});
  }catch(e) {
    console.log(e)
}
});
// DELETE user Destroy
//localhost:4000/apartment/1
router.delete('/:id', async(req, res) => {
  try {
    await db.apartment.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect('/apartment');
  } catch(e) {
    console.log(e.message)
  }
});
  
 // GET Dogs Edit
//localhost:4000/apartment/1/edit
router.get('/:id/edit', async(req, res) => {
  try{
  const apartment = await db.apartment.findOne({ where: {id: req.params.id}})
  
    res.render('apartments/edit.ejs', { apartment:apartment });
  } catch(e) {
console.log(e)
  }
  });



// PUT Dogs Update
//localhost:4000/apartment/3
router.put('/:id', async(req, res) => {
  try{
const updatedApartment = await db.apartment.update({ name: req.body.name}, {
    where: {
      id: req.params.id
    }
  })
  
      console.log('Updated Apartment = ', updatedApartment);
      res.redirect('/apartment');

}catch(e){
  console.log(e.message)
}
});







module.exports = router;