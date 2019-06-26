/**
 * Packages.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
			name: { type: 'string', required: false },
			price: { type: 'number', columnType: 'float', required: false},
			lawyers: { type: 'number',  columnType: 'integer', required: false },
			clients: { type: 'number', columnType: 'integer', required: false },
			duration: { type: 'number', columnType: 'integer', required: false },
  },

};

