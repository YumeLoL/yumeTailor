

## Backend 

- Typescript 
- Lucid ORM
- Adonis JS
- PostgreSQL
- Rest API



Submission Details:

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

   



4. Deploy the app in any of the Cloud platforms (e.g. AWS, Vercel, Azure)
● Create a document with the following.
○ Links to GitHub (Code needs to be accessible)
○ Link to the URL for the front-end
○ List of URL, routes for the Rest API and the expected JSON input
○ Write down any assumptions to make
○ Write any questions you have.
○ Write a paragraph about your key learning from this exercise. Keep this in bullet
points.
○ Write a paragraph



Programming Task
User-Story #1
As a Consumer, I want to go to a page, post a job and get notified with the quotes.
Acceptance Criteria

1. The consumer must be able to specify their first name, last name, phone number, and
  email address, address (including postcode and state), select the types of clothing (e.g.
  Dress, Ethnic Wear - Sari / Blouse), upload several images representing the type of
  clothing they want to get made, enter a description of their making in plain text, and
  specify a budget (optional).
  User Story #2
  As a Maker, I want to list all the available jobs, filter jobs by location and types of clothing, see
  the total count of quotations for jobs, and send a quote.
  Acceptance Criteria:
2. The maker must be able to list all jobs and view information such as the types of making,
  making, status, count of quotations, location, etc.
3. The maker must be able to select a specific job and see all the details the Customer
  provides.
3. The maker must be able to send a quotation, including a price and any other comments;
the system would notify the customer by email.