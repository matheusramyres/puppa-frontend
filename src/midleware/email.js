const nodemailer = require("nodemailer");

const SMTP_CONFIG = require('../config/smtp');

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  
});

module.exports ={
    async run(req, res, next) {

      try {
        const {descricao, email,assunto, nome} = req.body

        //A Puppa recebe
        const mailSent = await transporter.sendMail({
          text: descricao,
          subject: assunto,
          from: nome+"<"+email+">",
          to: "matheusramyres31@gmail.com",
        });

        //Quem envia
        const mailSent2 = await transporter.sendMail({
            text: "Recebemos seu e-mail, e embreve responderemos todas as suas duvidas!",
            subject: "Email recebido",
            from: "Puppa <matheus63360@gmail.com>",
            to: email,
          });
        next();
      } catch (error) {
        console.log(error);
        res.redirect('/');
      }
        
        
    },

    async usuarioEmail(req, res, next) {

        try {
            let {nome,cpf} = req.body;
  
          //A Puppa recebe
            const mailSent = await transporter.sendMail({
                subject: "Novo Revendedor",
                text: nome+" se cadastrou como revendedor, com numero do CPF:"+cpf,
                from: "matheus63360@gmail.com",
                to: "matheus63360@gmail.com",
                
            });
    
            
            next();

        } catch (error) {
          console.log(error);
          res.redirect('/register');
        }
          
          
      }
      
}
