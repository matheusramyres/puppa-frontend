require('dotenv').config();

module.exports={
	host: process.env.HOST_EMAIL,
	port: process.env.PORT_SMTP,
	user: process.env.USER_EMAIL,
	pass:process.env.PASS_EMAIL

	
}



