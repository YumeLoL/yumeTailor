import Route from '@ioc:Adonis/Core/Route'

// auth api
Route.post("api/register", "AuthController.register");
Route.post("api/login", "AuthController.login");
Route.get('api/logout', 'AuthController.logout')

// user management api
Route.get('api/user/:id', 'UsersController.show').middleware('auth:api')
Route.post('api/user/:id', 'UsersController.store')

// job management api
Route.get('api/:userId/jobs', 'JobsController.index')
Route.post('api/:userId/jobs', 'JobsController.store')

// cloth type api
Route.get('api/cloth-types', 'ClothTypesController.index')
