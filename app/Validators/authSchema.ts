import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const authSchema = schema.create({
  email: schema.string({ trim: true }, [
    rules.required(),
    rules.email(),
    rules.unique({ table: "users", column: "email" }),
  ]),
  password: schema.string({ trim: true }, [
    rules.required(),
    rules.minLength(6)
  ]),
});

