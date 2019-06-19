/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require("bcrypt");
var Promise = require("bluebird");
module.exports = {

  attributes: {
	company_id: { type: 'number', defaultsTo: 0 },
	name: { type: 'string', minLength: 5, maxLength: 50, required: true },
	email: { type: 'string', minLength: 5, maxLength: 50, required: true, isEmail: true, unique: true},
	password: { type: 'string', minLength: 6, maxLength: 20, required: true },
	address: { type: 'string', allowNull: true},
	type: { type: 'number', defaultsTo: 2 },
	phone: { type: 'string', minLength: 10, maxLength: 10, allowNull: true, },
	image: { type: 'string', allowNull: true },
	status: { type: 'boolean', defaultsTo: false },
	is_archived: { type: 'boolean', defaultsTo: false},
	is_email_confirmed: { type: 'boolean', defaultsTo: false},
	confirmation_token: { type: 'string', allowNull: true},
	reset_token: { type: 'string', allowNull: true}
    
  },

  beforeCreate: function(values, cb){
	  bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return cb(err);
      values.password = hash;
      cb();
    });
  },
  
  comparePassword: function(password, users) {
	return new Promise(function (resolve, reject) {
      bcrypt.compare(password, users.password, function (err, match) {
        if (err) reject(err);

        if (match) {
          resolve(true);
        } else {
          reject(err);
        }
      })
    });
  }

};

