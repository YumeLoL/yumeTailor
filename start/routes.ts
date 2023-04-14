import Route from "@ioc:Adonis/Core/Route";

// auth api
Route.post("api/register", "AuthController.register");
Route.post("api/login", "AuthController.login");
Route.get("api/logout", "AuthController.logout");

// job management api
Route.get("api/:userId/jobs", "JobsController.index");
Route.post("api/:userId/jobs", "JobsController.store");
Route.get("api/:userId/jobs/:jobId", "JobsController.show");

// cloth type api
Route.get("api/cloth-types", "ClothTypesController.index");



Route.group(() => {
  // user management api
  Route.get("api/user", "UsersController.show"); // get user details
  Route.post("api/user/:userId", "UsersController.store"); // create or update user details

}).middleware("auth");
