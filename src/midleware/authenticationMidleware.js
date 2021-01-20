const {validator,cpf} = require('cpf-cnpj-validator');
const joi = require('joi');
const api = require('../service/api');

const Joi = joi.extend(validator);
const cpfSchema = Joi.document().cpf().required();



async function verificaCpf(cpf){

  const cpf2 = await api.post('/revendedor/cpf',{cpf:cpf});
 
  if(cpf2.data.length !== 0){
    if(cpf == cpf2.data[0].cpf){
      return true;
    }
    return false;
  }
  return false;
  
}

module.exports = {
  
    authenticationMiddleware(req, res, next) {
        if (req.isAuthenticated()) {
          return next();
        }
        res.redirect('/logar');
    },


    async verificaCpf(req, res, next){
      const {id} = req.session.passport.user;
      const cpf = api.post('/revendedor',);
    },



    async validateCpf(req, res, next){

      const {cpf} = req.body;
    

      try{
        
        //valida cpf
        const value = await cpfSchema.validateAsync(cpf);
        
        //verifica cpf no banco
        const result = await verificaCpf(cpf);
  
        if(result){
          res.render('cadastro',{message: "O CPF já está cadastrado!"});
          return;
        }
        
        next();
      }catch(err){

        const e = err.message;
        res.render('cadastro',{message: e});
      }   

    },


    async validateEmail(req, res, next){
      
      const {email} = req.body;
      const result = await api.post('/revendedor/email',{email:email});
        if(result.data.message == "Found"){
          res.render('cadastro', {message:"Email já cadastrado!"});
          return; 
        }
        next();
      
    }



}

