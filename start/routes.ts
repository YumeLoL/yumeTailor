import Route from "@ioc:Adonis/Core/Route";

// Authentication endpoints
Route.post("api/auth/register", "AuthController.register");
Route.post("api/auth/login", "AuthController.login");
Route.get("api/auth/logout", "AuthController.logout");


// user management api - admin, consumer, maker
Route.group(() => {
  Route.get(":userId", "UsersController.show"); // get user details
  Route.post(":userId", "UsersController.store"); // create or update user details
})
  .prefix("api/user")
  // .middleware("auth");



// job management api
Route.group(() => {
    Route.get("jobs", "JobsController.index"); // List all jobs
    Route.post("jobs", "JobsController.store"); // Create a new job
    Route.put("jobs/:jobId", "JobsController.update"); // Update a job by ID
    Route.get("jobs/:jobId", "JobsController.show"); // Get a job by ID
    Route.delete("jobs/:jobId", "JobsController.destroy"); // Delete a job by ID
  })
    .prefix("api/:userId")
    // .middleware("auth");


// quotation management api
Route.group(() => { 
  Route.get("job/:jobId", "QuotationsController.index");  // show all quotations under a job id
  Route.post("job/:jobId", "QuotationsController.store"); // Create a new quotation under a job by user
  Route.get(":quotationId", "QuotationsController.show"); // show a quotation by quotation id
  Route.put(":quotationId", "QuotationsController.update"); // update a quotation by quotation id
  Route.delete(":quotationId", "QuotationsController.destroy"); // delete a quotation by quotation id
})
  .prefix("api/quotation")
  // .middleware("auth");


// common api
Route.get('api/jobs/search', 'CommonController.pageWithFilter') // page with filter


// cloth type api
Route.get("api/cloth_types", "ClothTypesController.index");


// image upload api
Route.post("api/images/:jobId", "ImagesController.upload");