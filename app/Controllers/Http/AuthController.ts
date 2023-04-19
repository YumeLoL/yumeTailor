import { Response } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import AuthValidator from "App/Validators/AuthValidator";

export default class AuthController {
  /**
   * login
   * @param param0
   * @returns
   */
  public async login({ request, auth, response }: HttpContextContract) {
   try {
      const { loginSchema, messages } = new AuthValidator({} as any);
      // Validate the request data
      const { email, password } = await request.validate({
        schema: loginSchema,
        messages: messages,
      });

      // Authenticate the user and retrieve a token
      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "10 days",
      });

      
      // Retrieve the user by email
      const user = await User.findByOrFail("email", email);
     

      // Save the user's id to the auth object
      await auth.use("api").login(user);

      return {code: 1, data:token.toJSON(), message: "Login successfully"};
    } catch (error) {
      response.status(error.status).send({ error: error.message.split(': ')[1] });
    }
  }

  /**
   * user registration
   * @param param0
   * @returns
   */
  public async register({ request, auth }: HttpContextContract) {
    // Validate the request data
    const { registerSchema, messages } = new AuthValidator({} as any);
    const { email, password, role } = await request.validate({
      schema: registerSchema,
      messages: messages,
    });

    try {
      const user = new User();
      user.email = email;
      user.password = password;
      user.role = role as number;
      await user.save();

      const token = await auth.use("api").login(user, {
        expiresIn: "10 days",
      });

      return token.toJSON();
    } catch (error) {
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
