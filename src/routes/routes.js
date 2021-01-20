const express = require('express');
const api = require('../service/api');
const email = require('../midleware/email');
const passport = require("passport");
const session = require("express-session");
const initializePassport = require('../service/auth')(passport);
require('dotenv').config();

const auth = require('../midleware/authenticationMidleware');

const routes = express.Router();
// session
// Colocar variavel de ambiente
routes.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUnitialized:false,
}));
  
routes.use(passport.initialize());
routes.use(passport.session());





//Home
routes.get('/',(req,res)=>{
    res.render('index.ejs');
});


//Redirect

routes.get('/register',(req, res)=>{
    res.render('cadastro',{message:""});
});
routes.get('/logout',(req, res)=>{
    req.logout();
    res.redirect('/');
});

//Transactions and Redirect
routes.post('/login',passport.authenticate("local", {
    successRedirect: "/revendedor",
    failureRedirect: "/login?fail=true"
}));
  
routes.get("/login",auth.authenticationMiddleware,(req, res) => {
    res.redirect('/revendedor');
});

routes.get("/logar",(req, res) => {
    res.render('login');
});

routes.get('/revendedor',async (req, res)=>{

    const revendedores = await api.get('/revendedor');
    const rev =revendedores.data;
    res.render('revendedor',{revendedores:rev});
});

routes.get('/sucess',(req,res)=>{
    res.render('cadSucess');
});

routes.post('/register/revendedor',auth.validateCpf, auth.validateEmail,email.usuarioEmail,async (req, res)=>{
    let {nome,
        endereco,
        cpf,
        estadocivil,
        escolaridade,
        email,
        fontederenda,
        celular,
        iswhatsapp} = req.body;
        
    if(iswhatsapp == "on"){
        iswhatsapp ="sim";
    }else{
        iswhatsapp = "não";
    }
    
    const result = await api.post('/revendedor',{
        nome,
        endereco,
        cpf,
        estadocivil,
        escolaridade,
        email,
        fontederenda,
        celular,
        iswhatsapp});
    console.log(result);

    res.redirect('/sucess');
});

routes.get('/detalhesreven/:id',auth.authenticationMiddleware,async(req,res)=>{
    
    const {id} = req.params;
    
    const result = await api.post('/revendedor/'+id);

    const data = result.data[0];
  
    res.render('detalhesRevendedor',{revendedor:data});
});

routes.post('/sendemail',email.run,(req,res)=>{

    res.redirect('/');

});


module.exports = routes;