const express = require('express');

const router = express.Router();

// import database
const db = require('../models');

const multer = require('multer');
const cloudinary = require('cloudinary');
//upload for image
const uploads = multer({ dest: './uploads'})



router.get('/images/new', function(req, res){
  res.render('new')
})

router.post('/images', uploads.single('inputFile'), (req,res)=>{
  //grab a uploaded file
  const image = req.file.path;
   console.log(image)
   //upload to cloudinary
   cloudinary.uploader.upload(image, (result)=>{
      //result comes back from cloudinary
      console.log(result)
      res.render('index', { image: result.url })
   })
})




module.exports = router;