var express = require('express');
var Users = require('../DBmodles/userModel');
var router = express.Router();


//signup
router.get('/', function(req, res, next) {
  res.render('user/register');
});


router.post('/',async function(req, res, next) {
    //console.log(req.body);
    let user = new Users(req.body);
    await user.save();
  res.redirect('/login');
});



//login
router.get('/login', function(req, res, next) {
  res.render('user/login');
});

router.post('/login',async function(req, res, next) {
    let user = await Users.findOne({email:req.body.email,password:req.body.password});
    if(!user)
    {
        return res.redirect('/login');
    }
    req.session.user = user;
       return res.redirect('/index');
    });

//logout
router.get('/logout', function(req, res, next) {
    req.session.user = null;
  res.redirect('/login');
});

module.exports = router;