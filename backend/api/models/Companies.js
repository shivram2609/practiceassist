/**
 * Companies.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	 name: { type: 'string', minLength: 5, maxLength: 50, required: true },
	 code: { type: 'string', allowNull: true },
	 users: { collection: 'users',  via: 'company' }
	 
  },

};

