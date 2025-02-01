const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import Models
const Product = require('./models/product')

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/shop_db').then((result) => {
    console.log('connected to mongodb')
}).catch((err) => {
    console.log(err);
});

app.set('views', path.join(__dirname, 'views'));  // menentukan folder views
app.set('view engine', 'ejs');  // menentukan engine yang digunakan

app.get('/', (req, res) => {
    res.send('Hello World');
})

// Membuat Restful Index Product / menampilkan seluruh data index
app.get('/products', async (req,res) => {   
    const products = await Product.find({})  // menampilkan query product.find dari mongodb
    res.render('products/index', {products}) // menampilkan view index.ejs dari folder views
})

// Menampilkan product berdasarkan id
app.get('/products/:id', async (req, res) => {
    const {id} = req.params
    const product  = await Product.findById(id) // menampilkan query product.findById dari mongodb
    console.log(product)
    res.render('products/show', {product}) // menampilkan view show.ejs dari folder views
})

app.listen(3000, () => {
    console.log('shop app listen on http://localhost:3000/')
})

