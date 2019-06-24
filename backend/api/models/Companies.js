/**
 * Companies.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	 name: { type: 'string', minLength: 5, maxLength: 50, required: true },
	 company_code: { type: 'string', allowNull: true },
	 owner: { collection: 'users',  via: 'company_id' }
  },

};

