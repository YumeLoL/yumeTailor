import Route from '@ioc:Adonis/Core/Route'

// auth api
Route.post("api/register", "AuthController.register");
Route.post("api/login", "AuthController.login");
Route.get('api/logout', 'AuthController.logout')

// user management api
Route.get('api/user/:userId', 'UsersController.show')
Route.post('api/user/:userId', 'UsersController.store') // create or update user details

// job management api
Route.get('api/:userId/jobs', 'JobsController.index')
Route.post('api/:userId/jobs', 'JobsController.store')

// cloth type api
Route.get('api/cloth-types', 'ClothTypesController.index')
