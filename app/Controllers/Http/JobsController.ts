import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Job from "App/Models/Job";

export default class JobsController {
  /**
   * get all jobs posted under a user id
   * @param param0
   * @returns
   */
  public async index({ params, response }: HttpContextContract) {
    const jobs = await Job.query()
      .where("user_id", params.userId)
      .orderBy("created_at", "desc");
    return response.json({ jobs });
  }


  /**
   * create a new job under a user id
   * @param param0
   * @returns
   */
  public async store({ params, request, response }: HttpContextContract) {
    const validatedData = {
      typeClothId: request.input('type_cloth_id'),
      description: request.input("description"),
      budget: request.input("budget"),
      status: request.input("status")
    };

    // const validatedData = await request.validate({
    //   schema: jobSchema
    // });


    const job = new Job();
    job.userId = params.userId;
    job.typeClothId = validatedData.typeClothId;
    job.description = validatedData.description;
    job.budget = validatedData.budget;
    job.status = validatedData.status;
    await job.save();

    return response.status(201).json({ job });
  }

  /**
   * update a job by job id
   * @param param0
   * @returns
   */
  public async update({ params, request, response }: HttpContextContract) {
    const validatedData = {
      typeClothId: request.input("type_cloth_id"),
      description: request.input("description"),
      budget: request.input("budget"),
    };

    const job = await Job.findOrFail(params.jobId);
    job.typeClothId = validatedData.typeClothId;
    job.description = validatedData.description;
    job.budget = validatedData.budget;
    await job.save();

    return response.json({ job });
  }

  /**
   * show a job by job id
   * @param param0
   * @returns
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const job = await Job.findOrFail(params.jobId);
      return response.json({ job });
    } catch (error) {
      return response.status(404).json({ message: "Job not found" });
    }
  }

  /**
   * delete a job by job id
   * @param param0
   * @returns
   */
  public async destroy({ params, response }: HttpContextContract) {
    const job = await Job.findOrFail(params.jobId);
    await job.delete();
    return response.json({ message: "Job deleted successfully" });
  }
}
