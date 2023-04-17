import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Job from "App/Models/Job";

export default class CommonController {
  /**
   *  list all the available jobs, filter jobs by location and types of clothing
   * @param param0
   * @returns
   */
  public async pageWithFilter({ request, response }: HttpContextContract) {
    // Get query parameters
    const { page, limit, location, type } = request.qs();

    // Create query builder for jobs table
    const jobsQuery = Job.query().select("jobs.*");

    // Filter by location
    if (location) {
      jobsQuery.where("location", "like", `%${location}%`);
    }

    // Filter by type of clothing
    if (type) {
      jobsQuery.where("type_cloth_id", type);
    }

    // Paginate the results
    const jobs = await jobsQuery.paginate(page || 1, limit || 10);

    return response.json({ jobs });
  }


}
