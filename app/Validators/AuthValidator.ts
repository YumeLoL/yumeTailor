import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public registerSchema = schema.create({
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(6),
    ]),
    role: schema.number.optional([
      rules.unsigned(),
      rules.required(),
      rules.range(1, 3),
    ]),
  });


  public loginSchema = schema.create({
    email: schema.string({ trim: true }, [
      rules.required(), 
      rules.email()
    ]),
    password: schema.string({ trim: true }, [
      rules.required()
    ]),
  });

  
  public messages: CustomMessages = {
    "email.required": "Email is required",
    "email.email": "Email is invalid",
    "email.unique": "Email is already taken",
    "password.required": "Password is required",
    "password.minLength": "Password is too short, at least 6 characters",
  };
}
