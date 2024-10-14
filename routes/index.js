var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

const userModel = require('./users')

passport.use(new LocalStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index')
});

router.get('/login', function(req, res) {
  res.render('login', {error: req.flash('error')})
});

router.get('/feed', function(req, res) {
  res.render('feed')
});


router.get('/profile', isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({
     username: req.session.passport.user
  })

  res.render('profile', {user})
});
         
router.post('/register', function(req, res, next){
  const userData =  userModel({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
  })

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate('local')(req, res, function(){
      res.redirect('/profile')
    })


  })
})

router.post('/login',passport.authenticate("local",{
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,  // To display error message on login failure
  
}),function(req, res, next) { 
});



router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });

});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


module.exports = router;
