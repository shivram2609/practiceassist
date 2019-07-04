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
   client: req.param('client'),
   case_time: req.param('case_time'),
   company : req.current_user.company
  }

  var lawyersIDs = req.param('lawyer');
  
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
 index: async function(req, res) {
  var casesList = await Cases.find({is_archived: 0});
  var casesArchived = await Cases.find({is_archived: 1});
  
  if (casesList.length > 0) {
  return res.json({
   status: true,
   response: {cases: casesList , archived:casesArchived},
   messages: []
  });
 } else {
  return res.json({
   status: false,
   response: {cases: [] , archived:[]},
   messages: ['No records found.']
  });
 }
 },
 //delete case 
 destroy: async function(req, res) {
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
 show: async function(req, res) {
  var getId = req.param('uid');
  var UsersList = await Cases.findOne({
   id: getId
  }).populate('lawyers');
  return res.json({
   status: true,
   response: UsersList,
   messages: []
  });

 },

 //update case 
 update: function(req, res) {

  var uid = req.param('id');

  var getAll = {
   client: req.param('client'),
   company: req.param('company'),
   title: req.param('title'),
   description: req.param('description'),
   price: req.param('price'),
   case_time: req.param('case_time'),
   court_name: req.param('court_name'),
   judge_name: req.param('judge_name'),
   file_number: req.param('file_number'),
   is_archived: req.param('is_archived')
  }

  //delete all rows from caselawyers table
  CaseLawyers.destroy({ case : uid }).then(function() {
	  });	 
	   
  Cases.updateOne({
   id: uid
  }).set(getAll).then(function() {
	  
	 //update caselawyers with new data
	  var lawyersIDs = req.param('lawyers');
	  	var caseLayers=[];
	lawyersIDs.forEach(function(lawyer) {
		caseLayers.push({ lawyer : lawyer, case : uid });
	});

	return CaseLawyers.createEach(caseLayers);
	  
	 }).then(function(caseLayers){ 
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
