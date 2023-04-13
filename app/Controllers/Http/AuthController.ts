import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RegisterUserDto from "App/Dtos/RegisterUserDto";
import User from "App/Models/User";

export default class AuthController {
  
  /**
   * login
   * @param param0
   * @returns
   */
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }


  /**
   * user registration
   * @param param0
   * @returns
   */
  public async register({ request, auth }: HttpContextContract) {
    const dto = await RegisterUserDto.fromRequest(request);

    // const trx = await User.transaction();

    try {
      const user = new User();
      user.email = dto.email;
      user.password = dto.password;
      user.roleId = dto.roleId;
      // await user.useTransaction(trx).save();
      await user.save();

      const token = await auth.use("api").login(user, {
        expiresIn: "10 days",
      });

      // await trx.commit();

      return token.toJSON();
    } catch (error) {
      // await trx.rollback();
      throw error;
    }
  }

  /**
   * logout
   * @param param0
   * @returns
   */
  public async logout({ auth }: HttpContextContract) {
    await auth.use("api").logout();
    return { message: "Logout successfully" };
  }
}
