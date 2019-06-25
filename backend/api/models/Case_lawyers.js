/**
 * Case_lawyers.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	  
	  lawyer_id:{ type: 'number', columnType: 'integer', required: true },
	  case_id:{ type: 'number', columnType: 'integer', required: false }
	 
  },

};

