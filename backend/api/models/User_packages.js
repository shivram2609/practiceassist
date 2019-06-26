/**
 * User_packages.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	user_id: { type: 'number', columnType: 'integer' ,required: false},
	package_id: { type: 'number', columnType: 'integer' ,required: false},
	price: { type: 'number', columnType: 'float',required: false},
  },

};

