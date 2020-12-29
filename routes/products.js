const cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();
var { Product } = require("../DBmodles/productModel");

/* GET home page. */
router.get('/', async function(req, res, next) {
  //console.log(req.session.user);
  let products= await Product.find();
  res.render('products/productList',{products});
});

router.get('/add',function(req, res, next) {
  res.render('products/add');
});


//add products
router.post('/add', async function(req, res, next) {
  let product = new Product(req.body);
  await product.save();
  res.redirect('/products');
});

//delet products
router.get('/delete/:id', async function(req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
});

//edit product

router.get('/edit/:id', async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  res.render("products/edit" , { product });
  });
router.post('/edit/:id', async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  console.log(product);
  console.log(req.body);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  res.redirect('/products');
  });

  //cart

    router.get('/cart', async function(req, res, next) { 
    let cart = req.cookies.cart;
    if(!cart) cart=[];
     res.render('products/cart',{cart});
  });

  router.get('/cart/:id', async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  console.log("ADd to cart");
  let cart = [];
  if(req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart",cart);
  res.redirect('/products');
});

router.get('/cart/remove/:id', async function(req, res, next) {
  console.log("Delete cookie");
  let cart = [];
  if(req.cookies.cart) cart = req.cookies.cart;
  cart.splice(cart.findIndex(c=> c._id=req.params.id),1);
  res.cookie("cart",cart);
  res.redirect('/products/cart');
});

//productlist2
router.get('/', async function(req, res, next) {
  //console.log(req.session.user);
  let products= await Product.find();
  res.render('products/productList2',{products});
});

module.exports = router;
