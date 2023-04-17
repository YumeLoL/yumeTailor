import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Roles from "App/Enums/Roles";
import User from "App/Models/User";
import UserDetail from "App/Models/UserDetail";
import { userValidationSchema } from "App/Validator/userSchema";

export default class UsersController {
  /**
   * get user info by user id
   * @param param0
   * @returns
   */
  public async index({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.userId);
      const userDetails = await UserDetail.findBy("user_id", params.userId);

      const userData = {
        id: params.userId,
        email: user.email,
        role: {
          role_id: user.role,
          role: Roles[user.role],
        },
      };

      return response.json({
        user: userData,
        userDetails: userDetails || null,
      });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  /**
   * create or update user details by user id
   * @param param0
   * @returns
   */
  public async store({ request, response, params }: HttpContextContract) {
    const validatedData = await request.validate({
      schema: userValidationSchema,
      messages: { required: "The {{ field }} field is required" },
    });
    const userId = params.userId;

    let userDetails = await UserDetail.findBy("user_id", userId);

    if (!userDetails || userDetails === undefined) {
      userDetails = new UserDetail();
      userDetails.userId = userId;
      userDetails.merge({ ...validatedData });
      await userDetails.save();
      return response.status(201).json({ userDetails });
    }

    userDetails.merge(validatedData);
    await userDetails.save();
    return response.json({ userDetails });
  }
}
