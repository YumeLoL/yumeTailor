import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Role from "App/Models/Role";
import User from "App/Models/User";
import UserDetail from "App/Models/UserDetail";

export default class UsersController {

  /**
   * create or update user details by user id
   * @param param0 
   * @returns 
   */
  public async store({ request, response, params }: HttpContextContract) {
    const userDetailsData = request.all();
    const userId = params.userId;
  
    let userDetails = await UserDetail.findBy('user_id', userId);
  
    if (!userDetails || userDetails === undefined) {
      userDetails = new UserDetail();
      userDetails.userId = userId;
      userDetails.merge({ ...userDetailsData });
      await userDetails.save();
      return response.status(201).json({ userDetails });
    }
  
    userDetails.merge(userDetailsData);
    await userDetails.save();
    return response.json({ userDetails });
  }
  
  

  /**
   * get all user info by user id 
   * @param param0 
   * @returns 
   */
  public async show({ params, response }: HttpContextContract) {
    const user = await User.firstOrFail(params.userId);
    const userDetails = await UserDetail.findBy("user_id", params.userId)
    const userRole = await Role.find(user.roleId); 

    const userData = {
      id: params.userId, 
      email: user.email,
      role: {
        role_id:user.roleId,
        role_name: userRole?.name
      },
    }
    
    return response.json({  user: userData, userDetails: userDetails || null });
  }
}
