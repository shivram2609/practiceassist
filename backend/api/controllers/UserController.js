/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const uuidv1 = require('uuid/v1');
module.exports = {

    create: function(req, res) {
        var user = {
            name: req.param('name'),
            email: req.param('email'),
            password: req.param('password'),
            type: req.param('type'),
            confirmation_token: uuidv1()
        }
        Users.create(user).then(function() {
            Mailer.sendWelcomeMail(user);
            return res.json({
                status: true,
                response: {},
                messages: ['User registered successfully.']
            });
        }).catch(function(error) {
            return res.json({
                status: false,
                response: {},
                messages: [error.message]
            });
        })
    },

    //email confirmation token message
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

    //change password reset password link
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

    login: function(req, res) {

        // get password and user from request
        var email = req.param('email');
        var password = req.param('password');

        //check if user and pass empty
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
    }

}
