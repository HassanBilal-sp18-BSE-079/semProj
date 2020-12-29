var express = require('express');
var router = express.Router();
var { Product } = require("../DBmodles/productModel");

router.get('/', function(req, res, next) {
  res.render('index2', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', async function(req, res, next) {
  //res.render('home', { title: 'Express' });
  let products= await Product.find();
  res.render('home',{products});
});

  //cart

  router.get('/cart', async function(req, res, next) { 
    let cart = req.cookies.cart;
    if(!cart) cart=[];
     res.render('cart',{cart});
  });

  router.get('/cart/:id', async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  console.log("ADd to cart");
  let cart = [];
  if(req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart",cart);
  res.redirect('/home');
});

router.get('/cart/remove/:id', async function(req, res, next) {
  console.log("Delete cookie");
  let cart = [];
  if(req.cookies.cart) cart = req.cookies.cart;
  cart.splice(cart.findIndex(c=> c._id=req.params.id),1);
  res.cookie("cart",cart);
  res.redirect('/cart');
});

//login
router.get('/loginuser', function(req, res, next) {
  res.render('loginuser', { title: 'Express' });
});

router.get('/signupuser', function(req, res, next) {
  res.render('signupuser', { title: 'Express' });
});


module.exports = router;
