import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const userValidationSchema = schema.create({
  first_name: schema.string({ trim: true }, [
    rules.required(),
    rules.maxLength(50),
  ]),
  last_name: schema.string({ trim: true }, [
    rules.required(),
    rules.maxLength(50),
  ]),
  phone: schema.string({ trim: true }, [
    rules.required(), 
    rules.mobile()
  ]),
  address: schema.string({ trim: true }, [
    rules.required(),
    rules.maxLength(255),
  ]),
  city: schema.string({ trim: true }, [
    rules.required(), 
    rules.maxLength(100)
]),
  state: schema.string({ trim: true }, [
    rules.required(),
    rules.maxLength(50),
  ]),
  zip: schema.string({ trim: true }, [
    rules.required(), 
    rules.maxLength(50)]),
});