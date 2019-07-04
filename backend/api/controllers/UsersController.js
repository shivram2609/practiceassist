/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const uuidv1 = require('uuid/v1');
module.exports = {
 /*
  * function: create
  * method: POST
  * url: /users
  * desc: create user with form value
  * params: name , email , password
  * author: Ramnish
  */
 create:  function(req, res) {
	 var userType = req.param('type');
	
		if(userType == 0) {
			 var user = { name: req.param('name'),  code: uuidv1() }
			 Companies.create(user).fetch().then(function (user) {
				 	  var user = {
							company: user.id,
							name: user.name,
							email: req.param('email'),
							password: req.param('password'),
							type: req.param('type'),
							confirmation_token: uuidv1(),
							package_id: req.param('package_id')
						  }
						Users.create(user).then(function() {
								Mailer.sendWelcomeMail(user);
								return res.json({
								 status: true,
								 response: {users: []},
								 messages: ['Firm has been registered successfully.']
								});
							}).catch(function(error) {
									return res.json({
									 status: false,
									 response: {users: []},
									 messages: [error.message]
									});
								   });
		
			});
			
		}else {
		  var user = {
			name: req.param('name'),
			email: req.param('email'), 
			password: req.param('password'), 
			type: req.param('type'),  
			package_id: req.param('package_id'),
			confirmation_token: uuidv1(), 
			is_email_confirmed: 0, 
			status: 0 ,
			company: null
			}
			Users.create(user).then(function() {
								Mailer.sendWelcomeMail(user);
								//Mailer.sendUserDetailInEmail(user);
								return res.json({
								 status: true,
								 response: {users: []},
								 messages: ['User has been registered successfully.']
								});
							}).catch(function(error) {
									return res.json({
									 status: false,
									 response: {users: []},
									 messages: [error.message]
									});
								   });
		  }
 },
 
	register: function(req, res) {
			
			var user = {
			name: req.param('name'),
			email: req.param('email'), 
			password: req.param('password'), 
			type: req.param('type'),  
			confirmation_token: 1, 
			is_email_confirmed: 1, 
			status: 1 ,
			company: req.current_user.company
			}
			Users.create(user).then(function() {
				Mailer.sendWelcomeMail(user);
				Mailer.sendUserDetailInEmail(user);
				return res.json({
				 status: true,
				 response: {users: []},
				 messages: ['User has been registered successfully.']
				});
			}).catch(function(error) {
					return res.json({
					 status: false,
					 response: {users: []},
					 messages: [error.message]
					});
				   });
		  
		
	},
	
 //email confirmation
 confirm_email: function(req, res) {
  var confirm_token = req.param('confirm_token');

  Users.findOne({
   confirmation_token: confirm_token
  }).then(function(user) {
   if (user) {
    Users.updateOne({
      id: user.id
     })
     .set({
      is_email_confirmed: 1,
      confirmation_token: 1
     }).then(function() {
      return res.json({
       status: true,
       response: {},
       messages: ["Your email has been confirmed successfully."]
      });
     }).catch(function(err) {
      return res.json({
       status: false,
       response: {},
       messages: ["Error confirmed email."]
      });
     });
   } else {
    return res.json({
     status: false,
     response: {},
     messages: ["Reset token expired."]
    });
   }
  }).catch(function(err) {
   return res.json({
    status: false,
    response: {},
    messages: ['Reset token expired.']
   });
  });


 },

 //send reset password link
 forgot_password: function(req, res) {
  var email = req.param('email');
  if (!(email)) {
   return res.json({
    status: false,
    response: {},
    messages: ['No email entered!']
   });
  }
  Users.findOne({
   email: email
  }).then(function(user) {
   if (user) {

    Users.updateOne({
      id: user.id
     })
     .set({
      reset_token: uuidv1()
     }).then(function(user) {
      Mailer.sendForgotPasswordMail(user);
      return res.json({
       status: true,
       response: {},
       messages: ["Please check your email to reset your password."]
      });
     }).catch(function(err) {
      return res.json({
       status: false,
       response: {},
       messages: ["Email not sent."]
      });
     });
   } else {
    return res.json({
     status: false,
     response: {},
     messages: ["Email not sent."]
    });
   }


  }).catch(function(err) {
   return res.json({
    status: false,
    response: {},
    messages: ['Email not sent.']
   });
  });
 },

 //change password
 change_password: function(req, res) {
  var password = req.param('password');
  var get_token = req.param('token_code');

  Users.findOne({
   reset_token: get_token
  }).then(function(user) {
   if (user) {
    //update password
    Users.updateOne({
      id: user.id
     })
     .set({
      password: password,
      reset_token: uuidv1()
     }).then(function() {
      return res.json({
       status: true,
       response: {},
       messages: ["Your password has been updated successfully."]
      });
     }).catch(function(err) {
      return res.json({
       status: false,
       response: {},
       messages: ["Error updating password."]
      });
     });
   } else {
    return res.json({
     status: false,
     response: {},
     messages: ["Reset token expired."]
    });
   }
  }).catch(function(err) {
   return res.json({
    status: false,
    response: {},
    messages: ['Reset token expired.']
   });
  });
 },

 //user login area
 login: async function(req, res) {
  var email = req.param('email');
  var password = req.param('password');

  if (!(email && password)) {
   return res.json({
    status: false,
    response: {},
    messages: ['No username or password entered!']
   });
  }

  Users.findOne({
   email: email
  }).populate('company').then(function(user) {
   return Users.comparePassword(password, user).then(function(valid) {
    if (!valid) throw new Error('Invalid Password');

    if (user.is_email_confirmed === false) {
     return res.json({
      status: false,
      response: {},
      messages: ["Your email is not verified yet."]
     });
    }


    var responseData = {
     user: {name: user.name,image: user.image, email: user.email},
     token: JwtService.issue({
      id: user.id
     })
    }
    return res.json({
     status: true,
     response: responseData,
     messages: ["Logging successfully."]
    });
   });
  }).catch(function(err) {
   return res.json({
    status: false,
    response: {},
    messages: ['Invalid username and password!']
   });
  });
 },

 /*
  * function: index
  * method: GET
  * url: /users
  * desc: list all the users by type
  * params: type
  * author: Ramnish
  */
 index: function(req, res) {
  var userType = req.param('type');
  userType=userType || Users.userType['LAWYER'];
  var users=Users.find({company: req.current_user.company,type: userType});
  
  return users.then(function(users){
	return Promise.all(users.map(function(user){
		user.case={};
		user.lawyer={};
		switch(userType){
			case Users.userType['LAWYER']:
				return CaseLawyers.findOne({lawyer: user.id}).populate('case').then(function(caseLawyer){
					if(caseLawyer){
						user.case=caseLawyer.case;
					}
					user.lawyer={id: user.id,name: user.name,image: user.image};
					return user; 
				});
			break;
			case Users.userType['CLIENT']:
				return Cases.findOne({client: user.id}).then(function(clientCase){
					if(clientCase){
						user.case=clientCase;
						return CaseLawyers.findOne({case: clientCase.id}).populate('lawyer').then(function(caseLawyer){
							if(caseLawyer.lawyer){
								user.lawyer=caseLawyer.lawyer;
							}
							return user;
						});
					}else{
						return user;
					}
				});
			break;
			default:
				return user;
		}
	}));
  }).then(function(users){
	return res.json({
		status: true,
		response: {users: users},
		messages: []
	});
  }).catch(function(err){
	return res.json({
		status: false,
		response: {users: []},
		messages: [err.message]
	});
  });
 },
 /*
  * function: show
  * method: GET
  * url: /users:id
  * desc: get user by id
  * params: uid
  * author: Ramnish
  */
  show: function(req, res) {
	var userId = req.param('uid');
	var users = Users.findOne({id : userId});
	return users.then(function(users) {
			return res.json({
				status: true,
				response: {users: users},
				messages: []
			});
		}).catch(function(err){
			return res.json({
				status: false,
				response: {users: [] },
				messages: [err.message]
				});
			});	
  },
  
  /*
  * function: update
  * method: POST
  * url: /users:id
  * desc: update user by id
  * params: uid , name , password
  * author: Ramnish
  */
 update: function(req, res) {
  var userId = req.param('uid');
  var users = Users.findOne({id : userId});

	return users.then(function(users) {
			 var userName = req.param('name');
			  if (req.param('password')) {   var userPassword = req.param('password');	}
			  Users.updateOne({ id: userId}).set({ name: userName, password: userPassword }).then(function(user) {
			   if (userPassword) {  Mailer.sendForgotPasswordMail(user); }
			   return res.json({
					 status: true,
					 response: {users: [] },
					 messages: ["User has been updated successfully."]
					 });
				 }).catch(function(err) {
					 return res.json({
						status: false,
						response: {users: [] },
						messages: ["Error updating user."]
					});
				});
		}).catch(function(err){
				return res.json({
					status: false,
					response: {users: [] },
					messages: [err.message]
					});
				});	
	
 },
 /*
  * function: destroy
  * method: post
  * url: /users:id
  * desc: destroy user by id
  * params: uid
  * author: Ramnish
  */
 destroy: async function(req, res) {
  var did = req.param('did');
  await Users.destroyOne({
   id: did
  });
  return res.json({
   status: true,
   response: {},
   messages: ["User has been deleted successfully."]
  });
 },

 //update password / update profile
 profile_update: function(req, res) {
  var current_password = req.param('current_password');
  var passwords = req.param('password');
 
  const access_verify = JwtService.verify(req.param('user_token'));

  //check if user update password
  if(passwords) {
	  Users.findOne({
	   id: access_verify.id
	  }).then(function(user) {
	   return Users.comparePassword(current_password, user).then(function(valid) {
		Users.updateOne({
		  id: access_verify.id
		 })
		 .set({
		  password: passwords
		 }).then(function(user) {
		  return res.json({
		   status: true,
		   response: {},
		   messages: ["Your password has been updated successfully."]
		  });
		 }).catch(function(err) {
		  return res.json({
		   status: false,
		   response: {},
		   messages: ["Error updating password."]
		  });
		 });
	   });
	  }).catch(function(err) {
	   return res.json({
		status: false,
		response: {},
		messages: ['Current password did not matched!']
	   });
	  });
  }else {
	  //update profile
	    var uName = req.param('name');
		var uEmail = req.param('email');
		
		//file upload case
		var path = require('path');
	 	req.file('image').upload({
		  dirname: path.resolve(sails.config.appPath, 'assets/images/profile_images')
		},function (err, uploadedFiles) {
		
		 uploadedFiles.forEach(function(value) {
			 Users.updateOne({ id: access_verify.id}).set({  image: path.basename(value.fd)
			}).then(function() { });
			});
		});
		
	  //update profile fields
	  Users.updateOne({ id: access_verify.id}).set({  name: uName
		 }).then(function(user) {
		
		  return res.json({
		   status: true,
		   response: {name: user.name, image: user.image, email: user.email},
		   messages: ["Your profile has been updated successfully."]
		  });
		 }).catch(function(err) {
		  return res.json({
		   status: false,
		   response: {},
		   messages: ["Error updating profile."]
		  });
		 });
		 
		 
  }
  
  
 },
 //update status
 update_status: async function(req, res) {

  var statusId = req.param('status');

  var get_user_status = await Users.findOne({
   id: statusId
  });
  if (get_user_status.status == true) {
   var statusValue = 0;
   var message = "User has been de-activated successfully.";
  } else {
   var statusValue = 1;
   var message = "User has been activated successfully.";

  }

  Users.updateOne({
    id: statusId
   })
   .set({
    status: statusValue
   }).then(function(user) {
    return res.json({
     status: true,
     response: {},
     messages: [message]
    });
   }).catch(function(err) {
    return res.json({
     status: false,
     response: {},
     messages: ["Error updating status."]
    });
   });
 },
  //get package type data
  get_packages: async function(req, res) {
   var packagesList =
    await Packages.find({});
    return res.json({
     status: true,
     response: packagesList,
     messages: []
    });
  },
  //filter data
  filter_record: async function(req , res) {
	var search = req.param('search');
	var companyId = req.current_user.company;
	var search = req.param('search');
	var type = req.param('type');
	
	if(req.param('search') == 'all') { 
		var sortData = await Users.find({}).where({ company: companyId, type: type});
	}else if(req.param('search') == 'case') {
		var sortData = await Users.find({ where: { name: { contains: search }, company: companyId, type: type } })
	.sort([{ name: 'ASC' }]);	
	}else{
		var sortData = await Users.find({ where: { name: { contains: search }, company: companyId, type: type } })
	.sort([{ name: 'ASC' }]);	
	}
	
	if(sortData.length > 0 ) {
	return res.json({
     status: true,
     response: sortData,
     messages: []
    });  
	}else {
		return res.json({
		 status: false,
		 response: sortData,
		 messages: ['No record found!']
		});  	
	}
  }

}
