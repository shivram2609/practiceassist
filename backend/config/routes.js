/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  /* 
   * /api/*
   *     /user/login
   * 	 /user/register
   * 	/user/confirmemail
   * 	/user/resendforgotpassword
   * 
   */
  
  'post /api/user/register': 'UserController.create',
  'post /api/user/login': 'UserController.login',
  'post /api/user/confirm_email': 'UserController.confirm_email',
  'post /api/user/forgot_password': 'UserController.forgot_password',
  'post /api/user/change_password': 'UserController.change_password',
  'post /api/user/userlist': 'UserController.get_users',
  'post /api/user/edit_user': 'UserController.edit_user',
  'post /api/user/update_user': 'UserController.update_user',
  'post /api/user/delete_user': 'UserController.delete_user',
  'post /api/user/update_password': 'UserController.update_password',
  'post /api/user/update_status': 'UserController.update_status',
  'get /api/user/get_packages': 'UserController.get_packages',
  
  
  'post /api/case/add_case': 'CasesController.create',
  'get /api/case/caselist': 'CasesController.get_cases',
  'post /api/case/delete_case': 'CasesController.delete_case',
  'post /api/case/edit_case': 'CasesController.edit_case',
  'post /api/case/update_case': 'CasesController.update_case',
  'post /api/case/archive_case': 'CasesController.archive_case',
  
  


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
