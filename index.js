const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/routes');
const path = require('path');
require('dotenv').config(); 

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/css',express.static(path.join(__dirname, 'public/static/css')));
app.use('/js',express.static(path.join(__dirname, 'public/static/js')));
app.use('/img',express.static(path.join(__dirname, 'public/static/img')));

//set Views
app.set('views', path.join(__dirname,'public'));
app.set('view engine', 'ejs');

//Rotas
app.use(routes);

app.listen(process.env.PORT,()=>{
    console.log("Server Online");
});

