const User = require('../DataBase/schema');
const bcrypt = require('bcrypt');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use('local',new LocalStrategy({
    usernameField : 'profilename',
    passwordField : 'password'    
},
  function(username, password, done) {
    User.findOne({ profilename: username },async function(err, user) {
        
            if(user === null){
                return done(null,false,{message:'No user is find ,Plz register'})
            }
    
            else if(user && await bcrypt.compareSync(password, user.password)){
                 done(null,user,{message:'loged-in successfully backend'})
            }else{
                return done(null,false,{message:'passwor is wrong'})
            }
        
    }).populate('productinfo');
  }
));


passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });