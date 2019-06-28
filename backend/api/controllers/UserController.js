/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const uuidv1 = require('uuid/v1');
module.exports = {

 create: async function(req, res) {

  if (req.param('type') == 0) {
   var user = {
    name: req.param('name'),
    company_code: uuidv1()
   }

  } else {

   var user = {
    name: req.param('name'),
    email: req.param('email'),
    password: req.param('password'),
    type: req.param('type'),
    //package_id: req.param('package_id'),
    company_code: req.param('company_code'),
    confirmation_token: req.param('company_code') ? 1 : uuidv1(),
    is_email_confirmed: req.param('company_code') ? 1 : 0,
    status: req.param('company_code') ? 1 : 0
   
   }

  }

  if (req.param('type') == 0) {
   //create company
   var companyDetails = await Companies.create(user).fetch();

   var companyDetail = {
    company_id: companyDetails.id,
    name: companyDetails.name,
    email: req.param('email'),
    password: req.param('password'),
    type: req.param('type'),
    confirmation_token: uuidv1(),
    //package_id: req.param('package_id')
   }

   //~ //create user
   Users.create(companyDetail).then(function() {
    Mailer.sendWelcomeMail(companyDetail);
    return res.json({
     status: true,
     response: {},
     messages: ['Firm has been registered successfully.']
    });
   }).catch(function(error) {
    return res.json({
     status: false,
     response: {},
     messages: [error.message]
    });
   })

  } else {

   //create user
   Users.create(user).then(function() {
    if (req.param('company_code')) {
     Mailer.sendUserDetailInEmail(user);
    } else {
     Mailer.sendWelcomeMail(user);
    }
    return res.json({
     status: true,
     response: {},
     messages: ['User has been registered successfully.']
    });
   }).catch(function(error) {
    return res.json({
     status: false,
     response: {},
     messages: [error.message]
    });
   })
  }
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
  }).then(function(user) {
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
     user: user,
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

 //get user listing
 get_users: async function(req, res) {
  var getCode = req.param('cCode');
  var type = req.param('type');
  var UsersList = await Users.find({
   company_code: getCode
  }).where({
   'type': type
  });
  if (UsersList.length > 0) {
   return res.json({
    status: true,
    response: UsersList,
    messages: []
   });
  } else {
   return res.json({
    status: false,
    response: UsersList,
    messages: ['No records found!']
   });
  }

 },

 //get edit_user
 edit_user: async function(req, res) {
  var getCode = req.param('uid');
  var UsersList = await Users.findOne({
   id: getCode
  });
  return res.json({
   status: true,
   response: UsersList,
   messages: [getCode]
  });

 },

 //uupdate user edit_user

 update_user: function(req, res) {
  var userName = req.param('name');
  var uid = req.param('id');
  if (req.param('password')) {
   var userPassword = req.param('password');
  }

  Users.updateOne({
    id: uid
   })
   .set({
    name: userName,
    password: userPassword
   }).then(function(user) {
    if (userPassword) {
     Mailer.sendForgotPasswordMail(user);
    }
    return res.json({
     status: true,
     response: {},
     messages: ["User has been updated successfully."]
    });
   }).catch(function(err) {
    return res.json({
     status: false,
     response: {},
     messages: ["Error updating user."]
    });
   });

 },
 //delete user

 delete_user: async function(req, res) {
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
 update_password: async function(req, res) {
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
	
	  Users.updateOne({ id: access_verify.id}).set({  name: uName
		 }).then(function(user) {
		  return res.json({
		   status: true,
		   response: user,
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
  }

}
