import Route from '@ioc:Adonis/Core/Route'

Route.post("api/register", "AuthController.register");
Route.post("api/login", "AuthController.login");


Route.get('api/user/:id', 'UsersController.show').middleware('auth:api')
Route.post('api/user/:id', 'UsersController.store')

Route.get('api/:userId/jobs', 'JobsController.index')
Route.post('api/:userId/jobs', 'JobsController.store')
