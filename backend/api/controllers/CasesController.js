/**
 * CasesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
	create: function(req, res) {
			var user = {
				title: req.param('title'),
				description: req.param('description'),
				client_id: req.param('client_id'),
				lawyer_id: req.param('lawyer_id'),
				case_time: req.param('case_time')
		}
		
		//create user
				Cases.create(user).then(function() {
					return res.json({
						status: true,
						response: {},
						messages: ['Case registered successfully.']
					});
				}).catch(function(error) {
					return res.json({
						status: false,
						response: {},
						messages: [error.message]
					});
				})
},
//get user listing
    get_cases:  function (req, res) {

		Cases.find(function(err, cases) {
        if (err) {return res.serverError(err);}
        return res.json({ status: true, response: cases , messages:[] });
		
    });
		
	},

};

