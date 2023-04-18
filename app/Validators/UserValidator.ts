import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(50),
    ]),
    last_name: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(50),
    ]),
    phone: schema.string({ trim: true }, [rules.required(), rules.mobile()]),
    address: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),
    city: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(100),
    ]),
    state: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(50),
    ]),
    zip: schema.string({ trim: true }, [rules.required(), rules.maxLength(50)]),
  });


  public messages: CustomMessages = {
    "first_name.required": "First name is required",
    "first_name.maxLength": "First name should be less than 50 characters",
    "last_name.required": "Last name is required",
    "last_name.maxLength": "Last name should be less than 50 characters",
    "phone.required": "Phone is required",
    "phone.mobile": "Phone number is not valid",
    "address.required": "Address is required",
    "address.maxLength": "Address should be less than 255 characters",
    "city.required": "City is required",
    "city.maxLength": "City should be less than 100 characters",
    "state.required": "State is required",
    "state.maxLength": "State should be less than 50 characters",
    "zip.required": "Zip is required",
    "zip.maxLength": "Zip should be less than 50 characters",
  };
}
