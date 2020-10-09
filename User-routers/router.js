const express = require('express');
const passport = require('passport')
const router = express.Router();
const info = require('../DataBase/schema');
const productinfo = require('../DataBase/Productschema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer  = require('multer')


//Get router....
router.get('/',async(req,res)=>{
  const get = await info.find();
  res.send(get)
})


//post For sig-up....
router.post('/sig-up',async(req,res)=>{
   const hash =await bcrypt.hashSync(req.body.password, 10);
   var post =  new info({
       name:req.body.name,
       email:req.body.email,
       profilename:req.body.profilename,
       password:hash,
       location :req.body.location
      
   });
      const save = await post.save();
      res.json(save);
});


//post For log-in....
router.post('/log_in', async function(req, res, next) {
   passport.authenticate('local',await function(err, user, info) {
   try{

      if (err) { res.json(err); }
      if (!user) { res.json(info); }
      req.logIn(user, function(err) {
    
         if (err) { return res.json(err) }   
         if (user){  
            var id = user._id
            var token = jwt.sign({id},"private key",{
                expiresIn:'1h'
            });
            return res.json({
               success:true,
               token:token,
               userinfo:user.profilename
           }) 
            }
         })
      }catch(e){
         res.end(e)
      } 
   })(req, res, next);
 });


 //Geting ProfileDetails by JWT....
router.get('/profile',(req,res)=>{
   var token = req.headers['authorization'];
  const x = jwt.verify(token, 'private key', (err, decoded)=> {
   if(err){res.json('user do not exist') }
   info.findById({
       _id:decoded.id
   }).populate('productinfo').then(user =>{
       if(user){
       res.json(user)}
       if(err){
         res.json('user do not exist') 
       }
   })
  })
})


//Updateing UserProfile.....
router.put('/profile-update',async(req,res)=>{
   const update = await info.updateOne({_id:req.body._id},{$set:{
      name:req.body.name,
      email:req.body.email, 
      profilename:req.body.profilename,
      image:req.body.image, 
      location: req.body.location
  }});
  res.status(200).json(update);   
})
 

//Multer storeage for UserProfilePic......
const storage = multer.diskStorage({   
    
   destination:(req,file,cb)=>{
       cb(null,'uploads/images')
   },
   filename:(req,file,cb)=>{
       cb(null,file.originalname)  
   }
});

const upload = multer({storage:storage});
router.put('/profilePic', upload.single('userimage'), async (req, res)=>{
   console.log(req.file);
   const update = await info.updateOne({_id:req.body._id},{$set:{ 
        
      userimage:req.file.path    
      }});
      res.status(200).json(update);  
})



 //Multer storeage2 for ProductProfilePic......
 const storage2 = multer.diskStorage({   
    
   destination:(req,file,cb)=>{
       cb(null,'uploads/prodectimage2')
   },
   filename:(req,file,cb)=>{
       cb(null,file.originalname)  
   }
})

const upload2 = multer({storage:storage2})

router.post('/productinfo',upload2.array('image1',3),async(req,res)=>{
   var paths = req.files.map(file => file.path)
   const prodect =await new productinfo({
      title:req.body.title,
      description:req.body.description,
      breed:req.body.breed,
      petage:req.body.petage,
      image1:paths,
      location:req.body.location,
      address:req.body.address,
      phonenumber:req.body.phonenumber,
      negotiable:req.body.negotiable,
      price:req.body.price,
      date:new Date()
     });
     await prodect.save()    
     const update = await info.findById({_id:req.body._id}).populate('productinfo');

      await update.productinfo.push(prodect)
      await update.save();
      
     res.json(update);
})



//Get Allad in Database.....
router.get('/getallAD',async(req,res)=>{
   const get = await productinfo.find()
   res.json(get)
})


router.delete('/deleteme',async(req,res)=>{
   const Delete = await productinfo.deleteOne({_id:req.query._id})
   res.json(Delete)
})

//Get AllUser&ad in Database.....
router.get('/getallUser',async(req,res)=>{
   const get = await info.find(). populate('productinfo')
   res.json(get)
})


//Get OnlyUsersAd in Database.....
router.post('/getUserAD',async(req,res)=>{
   const get = await info.findById({_id:req.body._id}). populate('productinfo')
   res.json(get)
})


//get productDetails....
router.get('/productDetail',async(req,res)=>{
   var id = req.headers['id'];
   const get = await productinfo.findById({_id:id})
   res.json(get)
})



//Expoting to index.js All routing file....
module.exports = router ;           