import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Job from "App/Models/Job";
import { jobSchema } from "App/Validator/jobSchema";

export default class JobsController {
  /**
   * get all jobs posted under a user id
   * @param param0 
   * @returns 
   */
  public async index({ params, response }: HttpContextContract) {
    const jobs = await Job.query().where("userId", params.userId).orderBy("created_at", "desc");
    return response.json({ jobs });
  }


  /**
   * create or update a job by user id
   * @param param0 
   * @returns 
   */
  public async store({ params, request, response }: HttpContextContract) {
    const validatedData = await request.validate({
      schema: jobSchema,
      messages: {   
        "typeClothId.exists": "Please select a valid type of cloth",
        'required': 'The {{ field }} field is required'
      },
    });

    const userId = params.userId;

    let jobDetails = await Job.findBy("user_id", userId);

    if (!jobDetails || jobDetails === undefined) {
      jobDetails = new Job();
      jobDetails.userId = userId;
      jobDetails.merge({ ...validatedData });
      await jobDetails.save();
      return response.status(201).json({ jobDetails });
    }

    jobDetails.merge(validatedData);
    await jobDetails.save();
    return response.json({ jobDetails });
  }

  

  public async show({ params, response }: HttpContextContract) {
    const job = await Job.firstOrFail(params.jobId);
    return response.json({ job });
  }

  public async destroy({ params, response }: HttpContextContract) { 
    const job = await Job.findOrFail(params.jobId);
    await job.delete();
    return response.json({ message: "Job deleted successfully" });
  }
}