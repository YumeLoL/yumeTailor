import { rules, schema } from "@ioc:Adonis/Core/Validator";

export const jobSchema = schema.create({
  typeClothId: schema.number([
    rules.exists({ table: "cloth_types", column: "id" }),
  ]),
  description: schema.string({ trim: true }, [rules.required()]),
  budget: schema.number([rules.required()]),
});
