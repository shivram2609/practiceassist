module.exports= { 
	
	sendWelcomeMail: function(obj) {

		 sails.hooks.email.send("welcomeEmail", {user: obj},
			 {
				 to: obj.email,
				 subject: "Welcome Email"
			 },
			function(err) {console.log(err || "Mail Sent!");}
		 );
	},
	
	sendForgotPasswordMail: function(obj) {
		
		 sails.hooks.email.send("ForgotPasswordEmail", {user: obj},
			 {
				 to: obj.email,
				 subject: "Reset Password Link"
			 },
			function(err) {console.log(err || "Mail Sent!");}
		 );
	}
}

