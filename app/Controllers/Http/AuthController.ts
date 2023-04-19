import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { CustomResponse } from "App/Middleware/GlobalResponseHandler";
import User from "App/Models/User";
import AuthValidator from "App/Validators/AuthValidator";

export default class AuthController {
  /**
   * login
   * @param param0
   * @returns
   */
  public async login({
    request,
    auth,
    response,
  }: HttpContextContract & { response: CustomResponse }) {
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

      return response.apiSuccess(
        { user: { id: user.id, role: user.role }, token: token.toJSON() },
        response.response.statusCode,
        "Login successfully"
      );
    } catch (error) {
      return response.apiError(error.message.split(": ")[1], error.status);
    }
  }

  /**
   * user registration
   * @param param0
   * @returns
   */
  public async register({
    request,
    response,
    auth,
  }: HttpContextContract & { response: CustomResponse }) {
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

      return response.apiSuccess(
        token.toJSON(),
        response.response.statusCode,
        "Register successfully"
      );
    } catch (error) {
      return response.apiError(error.message.split(": ")[1], error.status);
    }
  }

  /**
   * logout
   * @param param0
   * @returns
   */
  public async logout({
    response,
    auth,
  }: HttpContextContract & { response: CustomResponse }) {
    await auth.use("api").logout();
    return response.apiError(
      "Logout successfully",
      response.response.statusCode
    );
  }
}
