/**
 * Cases.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	  
			lawyer_id: { type: 'boolean', required: true },
			client_id: { type: 'boolean', required: true },
			company_id: { type: 'boolean', required: false},
			title: { type: 'string', minLength: 6, maxLength: 50, required: true },
			description: { type: 'string', required: true},
			price: { type: 'number', columnType: 'float', required: true},
			case_time: { type: 'string', columnType: 'datetime', allowNull: true, },
			court_name: { type: 'string', allowNull: true },
			judge_name: { type: 'string', allowNull: true },
			file_number: { type: 'string', allowNull: true},
			is_archived: { type: 'boolean', defaultsTo: false}
  },

};

