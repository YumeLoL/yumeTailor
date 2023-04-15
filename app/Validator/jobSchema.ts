import { rules, schema } from "@ioc:Adonis/Core/Validator";


const statusValues = ['published', 'unpublished'];

export const jobSchema = schema.create({
  typeClothId: schema.string(),
  description: schema.string({ trim: true }, [rules.required()]),
  budget: schema.string(),
  imagesUrl: schema.array().members(schema.string()),
  status: schema.enum(["published", "unpublished"]),
});
