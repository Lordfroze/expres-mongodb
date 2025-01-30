const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

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

app.listen(3000, () => {
    console.log('shop app listen on http://localhost:3000/')
})

