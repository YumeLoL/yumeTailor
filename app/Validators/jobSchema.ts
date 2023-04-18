import { rules, schema } from "@ioc:Adonis/Core/Validator";


export const jobSchema = schema.create({
  location: schema.string({ trim: true }, [rules.required()]),
  description: schema.string({ trim: true }, [rules.required()]),
  budget: schema.number([rules.required()]),
});
