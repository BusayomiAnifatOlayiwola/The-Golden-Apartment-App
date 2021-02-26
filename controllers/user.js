const express = require('express');

const router = express.Router();

// import database
const db = require('../models');

const multer = require('multer');
const cloudinary = require('cloudinary');
//upload for image
const uploads = multer({ dest: './uploads'})



router.get('/profile', function(req, res){
  res.render('profile')
})

router.put('/image', uploads.single('inputFile'), (req,res)=>{
  //grab a uploaded file
  const image = req.file.path;
   console.log(image)
   //upload to cloudinary
   cloudinary.uploader.upload(image, (result)=>{
      //result comes back from cloudinary
      // Change everyone with id of req.user.id

db.user.update({ image: result.url }, {
  where: {
    id: req.user.id
  }

})
.then(() => {
      console.log(result)
      res.redirect('profile')
   })
})
})


// // GET Dogs New
//   //localhost:4000/dogs/new
//   //for showing the form
//   router.get('/profile', (req, res) => {
//     res.render('profile.ejs');
//   });
  


module.exports = router;