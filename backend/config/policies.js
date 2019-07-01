/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
  '*': ['isAuthorized'],
  
  'UserController': {
    'create': true,
    'login': true,
    'forgot_password': true,
    'change_password': true,
    'confirm_email':true,
    'get_users':true,
    'edit_user':true,
    'update_user':true,
    'delete_user':true,
    'update_password':true,
    'update_status':true,
    'get_packages':true,
    'filter_record':true
  },
  'CasesController': {
	  'create':true,
	  'get_cases':true,
	  'delete_case':true,
	  'edit_case':true,
	  'update_case':true,
	  'archive_case':true,
	  
	  }
};
