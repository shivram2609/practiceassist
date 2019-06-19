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
  'post /api/user/change_password': 'UserController.change_password'


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
