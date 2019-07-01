/**
 * CasesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

 create:  function(req, res) {
  var user = {
   title: req.param('title'),
   description: req.param('description'),
   client_id: req.param('client_id'),
   case_time: req.param('case_time')
  }

	
  var lawyersIDs = req.param('lawyer_id');


  //create case
  Cases.create(user).fetch().then(function(cases) {
	var caseLayers=[];
	lawyersIDs.forEach(function(lawyer) {
		caseLayers.push({lawyer:lawyer,case:cases.id});
	});
	return CaseLawyers.createEach(caseLayers);
  }).then(function(caseLawyers){
   return res.json({
    status: true,
    response: {},
    messages: ['Case has been registered successfully.']
   });
  }).catch(function(error) {
   return res.json({
    status: false,
    response: {},
    messages: [error.message]
   });
  })
 },
 
 //get case listing
 get_cases: async function(req, res) {
  var casesList =
  await Cases.find({}).where({
   'is_archived': false
  });
  if (casesList.length > 0) {
  return res.json({
   status: true,
   response: casesList,
   messages: []
  });
 } else {
  return res.json({
   status: false,
   response: {},
   messages: ['No records found.']
  });
 }
 },
 //delete case 
 delete_case: async function(req, res) {
  var did = req.param('did');
  await Cases.destroyOne({
   id: did
  });
  return res.json({
   status: true,
   response: {},
   messages: ["Case has been deleted successfully."]
  });
 },
 //get edit_user
 edit_case: async function(req, res) {
  var getId = req.param('uid');
  var UsersList = await Cases.findOne({
   id: getId
  });
  return res.json({
   status: true,
   response: UsersList,
   messages: []
  });

 },

 //uupdate user edit_user
 update_case: function(req, res) {

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
 //archived case
 archive_case: async function(req, res) {
 var did = req.param('did');
 await Cases.updateOne({
  id:did 
 }).set({is_archived: true}).then(function() {
  return res.json({
   status: true,
   response: {},
   messages: ['Case has been archived successfully.']
  });
 }).catch(function(err) {
  return res.json({
   status: true,
   response: {},
   messages: ['Case has been archived successfully.']
  });
 });
 }

};
