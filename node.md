

# Backend 

- Typescript 
- Lucid ORM
- Adonis JS
- PostgreSQL
- Rest API



## Submission Details:

1. GitHub link (backend only):  https://github.com/YumeLoL/yumeTailor

2. List of URL, routes for the Rest API and the expected JSON input

   

   **Auth Management**

   There are 3 roles, they are admin 1, consumer 2, maker 3. Admin for employee use only, won't be shown at front-end.

   *User story:*

   As a user(consumer, maker), I can select a role when register a new account.

   ```json
   // USER field (user & userDetails model)
   {
       "user": {
           "id": "USER_2_8abb632a-5d9d-499b-a5bd-66cbbee67421",
           "email": "yume@gmail.com",
           "role": {
               "role_id": 2,
               "role": "CONSUMER"
           }
       },
       "userDetails": {
           "id": "3b87db7a-3e56-438d-8d10-3316fdeb294c",
           "user_id": "USER_2_8abb632a-5d9d-499b-a5bd-66cbbee67421",
           "first_name": "yumeng",
           "last_name": "li",
           "phone": "124124142",
           "address": "11 ashwodd",
           "city": "mebourne",
           "state": "vic",
           "zip": "3131",
           "created_at": "2023-04-18T19:18:32.421+10:00",
           "updated_at": "2023-04-18T19:18:32.421+10:00"
       }
   }
   ```

   

   ```javascript
   // Authentication endpoints
   Route.post("api/auth/register", "AuthController.register");
   Route.post("api/auth/login", "AuthController.login");
   Route.get("api/auth/logout", "AuthController.logout");
   ```

   ```json
   // User Register
   POST http://localhost:3333/api/auth/register
   
   // JOSN input
   {
     "email": "yume@gmail.com",
     "password": "12345678",
     "role": 2 // admin 1, consumer 2, maker 3
   }
   ```

   ```json
   // User Login
   POST http://localhost:3333/api/auth/login
   
   // JSON input
   {
     "email":"yume@gmail.com",
     "password":"12345678"
   }
   ```

   ```json
   // User Logout
   GET http://localhost:3333/api/auth/logout
   ```

   

   **User Management**

   *User ID format:* USER_ + role + uuid

   *User story:*

   As a user, I can read, add or update my contact details.

   ```javascript
   // user management api
   Route.group(() => {
     Route.get(":userId", "UsersController.index"); // get user details
     Route.post(":userId", "UsersController.store"); // create or update user details
   }).prefix("api/user");
     .middleware("auth");
   ```

   ```json
   // Get user details by userId
   GET http://localhost:3333/api/user/USER_2_8abb632a-5d9d-499b-a5bd-66cbbee67421
   ```

   ```json
   // Create or update user details
   POST http://localhost:3333/api/user/USER_2_8abb632a-5d9d-499b-a5bd-66cbbee67421
   
   // JOSN input
   {
       "first_name": "yumeng",
       "last_name": "li",
       "phone": "124124142",
       "address": "11 ashwodd",
       "city": "mebourne",
       "state": "vic",
       "zip": "3131",
       "country": "australia"
   }
   ```

   

   **Job Management**

   *Job ID format:* JOB_ + uuid

   *Cloth type code:* 1001 - shirt, 1002 - pants, 1003 - dress, 1004 - jacket, 1005 - shoes'

   *User story:*

   As a user (consumer), I can read/create/edit a job, be able to change the status(open/closed) of a job I posted.

   As a user(consumer), I can view a list of jobs I posted.

   As a user(maker), I can view a list of all jobs and filter by location or cloth type.

   As a use(maker), I can see the details of a job with total quotations. 

   ```JSON
   // JOB field
   {
       "job": {
           "id": "JOB_f8c4a3ef-756b-44e8-b4f3-4a81b54364e4",
           "user_id": "USER_2_8abb632a-5d9d-499b-a5bd-66cbbee67421",
           "cloth_type": 1003,
           "location": "melbourne",
           "description": "i need a dress",
           "budget": "188.00",
           "status": true,
           "quotation_count": 0,
           "created_at": "2023-04-18T21:33:02.473+10:00",
           "updated_at": "2023-04-18T21:33:02.473+10:00"
       }
   }
   ```

   

   ```javascript
   // job management api
   Route.group(() => {
     Route.get("search", "JobsController.index"); // list with pagination, and filter by location and/or cloth type
    
     Route.post(":userId", "JobsController.store"); // create a new post by user
     Route.put(":userId/edit/:jobId", "JobsController.edit"); // eidt a job by user
     Route.put(":userId/status/:jobId", "JobsController.updateStatus"); // update a job status by user (open or close)
    
     Route.get("all/:userId", "JobsController.showAll"); // get all jobs by user
     Route.get(":jobId", "JobsController.show"); // get a job by job id
   
   
     Route.delete(":userId/delete/:jobId", "JobsController.destroy"); // delete a job by user
   }).prefix("api/jobs");
     .middleware("auth");
   ```

   ```JSON
   // list with pagination, and filter by location and/or cloth type
   GET http://localhost:3333/api/jobs/search?location=melbourne&type=1001&page=1&limit=2
   ```

   ```json
   // create a new job post by user
   POST http://localhost:3333/api/jobs/USER_2_8abb632a-5d9d-499b-a5bd-66cbbee67421
   
   // JSON input
   {
       "clothType": 1003,
       "location": "melbourne",
       "description": "i need a dress",
       "budget": 188
   }
   ```

   ```json
   // eidt the job by user
   PUT http://localhost:3333/api/jobs/USER_2_8abb632a-5d9d-499b-a5bd-66cbbee67421/edit/JOB_50ea42be-9d63-4bcb-9803-ad3a58fad320
   
   // JSON input
   {
       "clothType": 1004,
       "location":"sydney",
       "description": "i need a jacket now",
       "budget": 300
   }
   ```

   ```json
   // update a job status by user (open or close)
   PUT http://localhost:3333/api/jobs/USER_2_8abb632a-5d9d-499b-a5bd-66cbbee67421/status/JOB_50ea42be-9d63-4bcb-9803-ad3a58fad320
   
   // JSON input
   {
       "status": false
   }
   ```

   ```json
   // get all jobs posted by user
   GET http://localhost:3333/api/jobs/all/USER_2_8abb632a-5d9d-499b-a5bd-66cbbee67421
   ```

   ```json
   // get a job by job id
   GET http://localhost:3333/api/jobs/JOB_f8c4a3ef-756b-44e8-b4f3-4a81b54364e4
   ```

   

   

   **Quotation Management**

   *Quotation ID format:* QUOTE_ + uuid

   *Quotation status code:* PENDING = 2001, ACCEPTED = 2002, REJECTED = 2003

   

   *User story:*

   As a user (maker), I can make a quotation requests for the job. 

   As a user(consumer), I can read all quotations under the job I posted. I can modify the status of the quotation to accepted or rejected.

   As a user, I can view the quotation details. 

   ```json
   // QUOTATION field
   {
       "quotations": [
           {
               "id": "QUOTE_bff80279-73e8-4f04-9900-bf0c63a5ccfb",
               "job_id": "JOB_f8c4a3ef-756b-44e8-b4f3-4a81b54364e4",
               "user_id": "USER_3_07a5cd36-adcb-4c64-89a7-d51dc18570e8",
               "bid": "99.00",
               "status": 2001,
               "message": "I can make it",
               "created_at": "2023-04-18T21:53:52.963+10:00",
               "updated_at": "2023-04-18T21:53:52.963+10:00"
           }
       ]
   }
   ```

   ```javascript
   // quotation management api
    Route.group(() => {
      Route.get("search", "QuotationsController.index"); // show all quotations filter by status
   
      Route.post("job/:jobId", "QuotationsController.store"); // Create a new quotation under a job by user
      Route.get(":quotationId", "QuotationsController.show"); // show a quotation by quotation id
      Route.get("all/:id", "QuotationsController.showAll"); // show all quotations under a job id
   
      Route.put(":userId/status/:quotationId", "QuotationsController.update"); // update a quotation by quotation id
   }).prefix("api/quotation");
     .middleware("auth");
   ```

   ```json
   // Create a new quotation
   POST http://localhost:3333/api/quotation/job/JOB_f8c4a3ef-756b-44e8-b4f3-4a81b54364e4
   
   // JSON input
   {
       "user_id": "USER_3_07a5cd36-adcb-4c64-89a7-d51dc18570e8",
       "bid": 99,
       "status": 2001,
       "message": "I can make it"
   }
   ```

   ```json
   // show all quotations filter by status
   GET http://localhost:3333/api/quotation/search?page=1&limit=2&status=2001
   ```

   ```json
   // show a quotation by quotation id
   GET http://localhost:3333/api/quotation/QUOTE_bff80279-73e8-4f04-9900-bf0c63a5ccfb
   ```

   ```json
   // show all quotations under a job id
   GET http://localhost:3333/api/quotation/all/JOB_f8c4a3ef-756b-44e8-b4f3-4a81b54364e4
   ```

   ```json
   // change status of a quotation
   // only consumer who posted the job can modify the status of the quotation under this job
   PUT http://localhost:3333/api/quotation/USER_2_8abb632a-5d9d-499b-a5bd-66cbbee67421/status/QUOTE_223bef25-754a-4560-b1e7-ae12d785323a
   
   // JSON input
   { 
       "status": 2002
   }
   // JSON output
   {
       "quote": {
           "id": "QUOTE_223bef25-754a-4560-b1e7-ae12d785323a",
           "job_id": "JOB_f8c4a3ef-756b-44e8-b4f3-4a81b54364e4",
           "user_id": "USER_3_07a5cd36-adcb-4c64-89a7-d51dc18570e8",
           "bid": "99.00",
           "status": 2002,
           "message": "I can make it",
           "created_at": "2023-04-18T22:05:13.222+10:00",
           "updated_at": "2023-04-18T23:13:42.182+10:00"
       },
       "message": "Quotation status updated successfully"
   }
   ```

   



## Write any questions you have

- Endpoints: for the backend development, I always get confused about how to define the endpoints to keep it simple and easy to understand. For example, if the API needs more than one ID with data passing from front-end, which field should be carried within the URL as params, which field should be leave in the request body.

- Error handling: how to properly handle errors in AdonisJS, I need to practice more about handle exception.

- Data protection: don't know about how to handle security and data protection. For example, userId as params passing with URL, is that secure.

- Table relationship: should I use foreign key or not. I don't use foreign key in this project because I might be always modify the table field and code. While in the practice, which method is good.

  

## Key learning

- Learnt using AdonisJS framework to simplify the development process, it provides a set of tools. 

- The routing system, it defines routes with ease, such as route grouping, named routes.

- Learnt the middleware like validator to validate incoming requests. 

- Learnt Lucid ORM for interacting with databases. 

  

## Areas you want to learn further and focus on during this internship

I'm really interested in pursuing a career in web development, and I'm excited to start this internship to learn more about the industry. While I'm interested in all aspects of web development, I'm particularly drawn to the back-end. I'm eager to learn more about databases, API development, and server-side scripting languages. That being said, I'm not limited to just the back-end and I'm also excited to explore front-end development and gain a more well-rounded skill set. 