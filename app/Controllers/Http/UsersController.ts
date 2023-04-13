import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import UserDetail from "App/Models/UserDetail";

export default class UsersController {
  public async show({ params, response }: HttpContextContract) {
    const user = await User.query().where("id", params.id).firstOrFail();
    const userDetails = await UserDetail.query()
      .where("user_id", params.id)
      .firstOrFail();

    return response.json({ user, userDetails });
  }

  public async store({ request, response, params }: HttpContextContract) {
    const userDetailsData = request.all();
    const userId = params.id;

    const userDetails = await UserDetail.findBy("user_id", userId);

    if (userDetails) {
        userDetails.merge(userDetailsData)
        await userDetails.save()
        return response.json({ userDetails })
      } else {
        return response.status(404).json({ message: 'User details not found' })
      }
  }
}
