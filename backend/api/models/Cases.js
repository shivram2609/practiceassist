/**
 * Cases.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	  
			client_id: { model: 'Users' },
			company: { type: 'number', columnType: 'integer', required: false},
			title: { type: 'string', minLength: 6, maxLength: 50, required: true },
			description: { type: 'string', required: true},
			price: { type: 'number', columnType: 'float', required: false},
			case_time: { type: 'ref', columnType: 'datetime'},
			court_name: { type: 'string', allowNull: true },
			judge_name: { type: 'string', allowNull: true },
			file_number: { type: 'string', allowNull: true},
			is_archived: { type: 'boolean', defaultsTo: false},
			lawyer: { collection: 'Users', via: 'case', through: 'caselawyers' },
			
  }

};

