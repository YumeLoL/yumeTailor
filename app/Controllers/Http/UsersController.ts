import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Roles from "App/Enums/Roles";
import { CustomResponse } from "App/Middleware/GlobalResponseHandler";
import User from "App/Models/User";
import UserDetail from "App/Models/UserDetail";
import UserValidator from "App/Validators/UserValidator";

export default class UsersController {
  /**
   * get user info by user id
   * @param param0
   * @returns
   */
  public async show({ params, response }: HttpContextContract) {
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
    const validatedData = await request.validate(UserValidator);
    const userId = params.userId;
    const userRole = userId.split("_")[1];

    let userDetails = await UserDetail.findBy("user_id", userId);

    if (!userDetails || userDetails === undefined) {
      userDetails = new UserDetail();
      userDetails.userId = userId;
      userDetails.userRole = userRole;
      userDetails.merge({ ...validatedData });
      await userDetails.save();
      return response.status(201).json({ userDetails });
    }

    userDetails.merge(validatedData);
    await userDetails.save();
    return response.json({ userDetails });
  }

  /**
   * get all users list with pagination, filter by role
   * @param param0
   * @returns
   */
  public async index({
    request,
    response,
  }: HttpContextContract & { response: CustomResponse }) {
    try {
    const { page, limit, role } = request.qs();
 
      const makerQuery = User.query()
        .select("users.*")
        .orderBy("created_at", "desc");
      
      
      if (role) {
        makerQuery.where("role", role);
      }

      // Paginate the results
      const users = await makerQuery.paginate(page || 1, limit || 10);

      return response.apiSuccess(
        users,
        response.response.statusCode,
        "Users list retrieved successfully"
      );
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
