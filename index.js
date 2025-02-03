const path = require('path');
const express = require('express');
const methodOverride = require('method-override') // untuk mengupdate data
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
app.use(express.urlencoded({extended:true})) // agar data dapat diambil dari form
app.use(methodOverride('_method')) // import method override

app.get('/', (req, res) => {
    res.send('Hello World');
})

// Membuat Restful Index Product / menampilkan seluruh data index
app.get('/products', async (req,res) => {   
    const products = await Product.find({})  // menampilkan query product.find dari mongodb
    res.render('products/index', {products}) // menampilkan view index.ejs dari folder views
})

// Menampilkan form create
app.get('/products/create', (req, res) => {
    res.render('products/create')
})

// Menyimpan data
app.post('/products', async (req, res) => {
    const product = new Product(req.body) // mengambil data dari form
    await product.save()
    res.redirect(`/products/${product._id}`)
})


// Menampilkan product berdasarkan id
app.get('/products/:id', async (req, res) => {
    const {id} = req.params
    const product  = await Product.findById(id) // menampilkan query product.findById dari mongodb
    console.log(product)
    res.render('products/show', {product}) // menampilkan view show.ejs dari folder views
})

// Menampilkan form edit
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/edit', {product})
})

// Melakukan proses update untuk menerapkan hasil form edit
app.put('/products/:id', async (req,res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true})
    res.redirect(`/products/${product._id}`)
})


app.listen(3000, () => {
    console.log('shop app listen on http://localhost:3000/')
})

