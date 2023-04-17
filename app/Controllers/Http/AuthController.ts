import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { loginUserSchema, registerUserSchema } from "App/Validator/authSchema";
import User from "App/Models/User";

export default class AuthController {
  /**
   * login
   * @param param0
   * @returns
   */
  public async login({ request, auth }: HttpContextContract) {
    // Validate the request data
    const validateLogin = await request.validate({
      schema: loginUserSchema,
      messages: {
        required: "The {{ field }} field is required",
        minLength:
          "The {{ field }} field cannot less than {{ options.minLength }} characters",
      },
    });
    const { email, password } = validateLogin;

    // Authenticate the user and retrieve a token
    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "10 days",
    });

    // Retrieve the user by email
    const user = await User.findByOrFail("email", email);
    
    
    // Save the user's id to the auth object
    await auth.use("api").login(user);
    
    return token.toJSON();
  }

  /**
   * user registration
   * @param param0
   * @returns
   */
  public async register({ request, auth }: HttpContextContract) {
    const validatedUser = await request.validate({
      schema: registerUserSchema,
      messages: {
        required: "The {{ field }} field is required",
        minLength:
          "The {{ field }} field cannot less than {{ options.minLength }} characters",
      },
    });

    // const trx = await User.transaction();

    try {
      const user = new User();
      user.email = validatedUser.email;
      user.password = validatedUser.password;
      user.roleId = validatedUser.roleId as number;
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
