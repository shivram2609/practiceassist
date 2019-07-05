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
  // Only those action and controllers which needs access without authorization 
  'UsersController': {
    'register': true,
    'login': true,
    'forgot_password': true,
    'change_password': true,
    'confirm_email':true,
    'get_packages':true,

  }
};
