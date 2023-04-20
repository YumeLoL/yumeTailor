import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Job from "App/Models/Job";
import { CustomResponse } from "App/Middleware/GlobalResponseHandler";
import JobValidator from "App/Validators/JobValidator";

export default class JobsController {
  /**
   *  list all the available jobs, filter jobs by location and types of clothing
   * @param param0
   * @returns
   */
  public async index({ request, response }: HttpContextContract & { response: CustomResponse }) {
    // Get query parameters
    const { page, limit, location, type } = request.qs();

    // Create query builder for jobs table
    const jobsQuery = Job.query()
      .select("jobs.*")
      .orderBy("created_at", "desc");

    // Filter by location
    if (location) {
      jobsQuery.where("location", "like", `%${location}%`);
    }

    // Filter by type of clothing
    if (type) {
      jobsQuery.where("cloth_type", type);
    }

    // Paginate the results
    const jobs = await jobsQuery.paginate(page || 1, limit || 10);

    return response.apiSuccess(jobs, response.response.statusCode, "Jobs retrieved successfully");
  }

  /**
   * create a new job by user
   * @param param0
   * @returns
   */
  public async store({ params, request, response }: HttpContextContract) {
    try {
      const jobData = request.all();
      jobData.userId = params.userId;

      const { userId, name, clothType, location, description, budget } =
        await request.validate(JobValidator);

      const job = await Job.create({
        userId,
        name,
        clothType,
        location: location.toLowerCase(),
        description,
        budget,
        status: true,
        quotationCount: 0,
      });

      return response.status(201).json({ job });
    } catch (error) {
      return response.status(422).json({ errors: error.messages });
    }
  }

  /**
   * update a job by user
   * @param param0
   * @returns
   */
  public async edit({ params, request, response }: HttpContextContract) {
    try {
      const job = await Job.findOrFail(params.jobId);
      if (job.userId !== params.userId) {
        return response
          .status(403)
          .json({ message: "You are not authorized to update this job" });
      }

      const jobData = request.all();
      await request.validate(JobValidator);

      job.merge(jobData);

      await job.save();

      return response.json({ job });
    } catch (error) {
      return response.status(422).json({ errors: error.messages });
    }
  }

  /**
   *
   * @param param0
   * @returns
   */
  public async updateStatus({
    params,
    request,
    response,
  }: HttpContextContract) {
    const job = await Job.findOrFail(params.jobId);

    if (!job) {
      return response.status(404).json({ message: "Job not found" });
    }

    if (job.userId !== params.userId) {
      return response
        .status(403)
        .json({ message: "You are not authorized to update this job" });
    }

    job.status = request.input("status");
    await job.save();

    return response.json({ job });
  }

  /**
   * show all jobs posted by a user
   */
  public async showAll({ params, response }: HttpContextContract) {
    const jobs = await Job.query()
      .where("user_id", params.userId)
      .orderBy("created_at", "desc");
    return response.json({ jobs });
  }

  /**
   * show a job by job id
   * @param param0
   * @returns
   */
  public async show({ params, response }: HttpContextContract & { response: CustomResponse }) {
    try {
      const job = await Job.findBy("id", params.jobId);

      if (job) {
        return response.apiSuccess( job, response.response.statusCode, "Job retrieved successfully")
      }

      return response.apiError("Job not found", 404);
    } catch (error) {
      return response.apiError(error.message.split(": ")[1], error.status);
    }
  }

  /**
   * delete a job by user
   * @param param0
   * @returns
   */
  public async destroy({ params, response }: HttpContextContract) {
    const job = await Job.findOrFail(params.jobId);

    // Check if the authenticated user is the creator of the job
    if (job.userId !== params.userId) {
      return response
        .status(403)
        .json({ message: "You are not authorized to delete this job" });
    }

    await job.delete();
    return response.json({ message: "Job deleted successfully" });
  }
}
