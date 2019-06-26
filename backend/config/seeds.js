/**
 * Sails Seed Settings
 * (sails.config.seeds)
 *
 * Configuration for the data seeding in Sails.
 *
 * For more information on configuration, check out:
 * http://github.com/frostme/sails-seed
 */
module.exports.seeds = {
	packages: [
	 { name: 'Free Trial', price: 0, lawyers: 1, clients: 1, duration: 0  },
	 { name: 'Premium', price: 40, lawyers: 10, clients: 5, duration: 0  },
	 { name: 'Popular', price: 100, lawyers: 50, clients: 25, duration: 3  },
	]
}
