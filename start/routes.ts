import Route from "@ioc:Adonis/Core/Route";

// Authentication endpoints
Route.post("api/auth/register", "AuthController.register");
Route.post("api/auth/login", "AuthController.login");
Route.get("api/auth/logout", "AuthController.logout");

// user management api - admin, consumer, maker
Route.group(() => {
  Route.get(":userId", "UsersController.index"); // get user details
  Route.post(":userId", "UsersController.store"); // create or update user details
}).prefix("api/user");
// .middleware("auth");


// job management api
Route.group(() => {
  Route.get("search", "JobsController.index"); // pagination with filter by location and cloth type
 
  Route.post(":userId", "JobsController.store"); // create a new post by user
  Route.put(":userId/edit/:jobId", "JobsController.edit"); // update a job by user
  Route.put(":userId/status/:jobId", "JobsController.updateStatus"); // update a job status by user (open or close)
 
  Route.get("all/:userId", "JobsController.showAll"); // get all jobs by user
  Route.get(":jobId", "JobsController.show"); // get a job by job id


  Route.delete(":userId/delete/:jobId", "JobsController.destroy"); // delete a job by user
}).prefix("api/jobs");
// .middleware("auth");



// quotation management api
 Route.group(() => {
   Route.get("search", "QuotationsController.index"); // show all quotations filter by status

   Route.post("job/:jobId", "QuotationsController.store"); // Create a new quotation under a job by user
   Route.get(":quotationId", "QuotationsController.show"); // show a quotation by quotation id
   Route.get("all/:id", "QuotationsController.showAll"); // show all quotations under a job id

   Route.put(":userId/status/:quotationId", "QuotationsController.update"); // update a quotation by quotation id
}).prefix("api/quotation");
// .middleware("auth");


// cloth type api
Route.get("api/cloth_types", "ClothTypesController.index");

// image upload api
Route.post("api/images/:jobId", "ImagesController.upload");
