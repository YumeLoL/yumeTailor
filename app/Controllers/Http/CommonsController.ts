import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { CustomResponse } from "App/Middleware/GlobalResponseHandler";
import Job from "App/Models/Job";

export default class CommonsController {
  public async getLocations({
    response,
  }: HttpContextContract & { response: CustomResponse }) {
    try {
        const locations = await Job.query().distinct('location')
        const locationList = locations.map(location => location.location)

      return response.apiSuccess(
        locationList,
        response.response.statusCode,
        "Locations retrieved successfully"
      );
    } catch (error) {
      return response.apiError(error.message.split(": ")[1], error.status);
    }
  }
}
