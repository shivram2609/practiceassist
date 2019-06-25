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
				case_time: req.param('case_time')
		}
		
		
		//var lawyersIDs = { lawyer_id: req.param('lawyer_id') }

				
				 //~ Case_lawyers.createEach([lawyersIDs]).exec(function (err, user) {
				  //~ if (err) return res.serverError(err);
				  //~ sails.log(user)
				//~ })
				
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
        if (cases.length > 0) {
			return res.json({ status: true, response: cases , messages:[] });
		}else{
			return res.json({ status: false, response: {} , messages:['No records found.'] });
		}
    });	
	},
	//delete case 
	delete_case: async function(req, res) {
		var did =  req.param('did');
		await Cases.destroyOne({id: did});
        return res.json({ status: true, response: {}, messages: ["Case has been deleted successfully."] });	
	},
	
	
	 //get edit_user
    edit_case: async function (req, res) {
		var getId = req.param('uid');
		var UsersList = await Cases.findOne({id: getId});
		return res.json({ status: true, response: UsersList , messages:[] });
		
	},
	
		//uupdate user edit_user
    update_case: function (req, res) {		
		
	var uid = req.param('id');

			
	var getAll = { 
				client_id: req.param('client_id'),
				company_id: req.param('company_id'),
				title: req.param('title'),
				description: req.param('description'),
				price: req.param('price'),
				case_time: req.param('case_time'),
				court_name: req.param('court_name'),
				judge_name: req.param('judge_name'),
				file_number: req.param('file_number'),
				is_archived: req.param('is_archived')
		}
	
	Cases.updateOne({
				id: uid
			}).set(getAll).then(function() {
				return res.json({
					status: true,
					response: {},
					messages: ["Case has been updated successfully."]
				});
			}).catch(function(err) {
				return res.json({
					status: false,
					response: {},
					messages: ["Error updating case."]
				});
			});
	},

};

