import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class JobValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    jobId: schema.string.optional({}, [
      rules.exists({ table: "jobs", column: "id" }),
    ]),
    userId: schema.string.optional({}, [
      rules.exists({ table: "users", column: "id" }),
    ]),
    name: schema.string({ trim: true }, [rules.required()]),
    clothType: schema.number([rules.required(), rules.range(1001, 1005)]),
    location: schema.string({ trim: true }, [rules.required()]),
    description: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),
    budget: schema.number([rules.required()]),
    status: schema.boolean.optional(),
    quotationCount: schema.number.optional(),
  });

  public messages: CustomMessages = {
    "jobId.exists": "Job ID is not exists",
    "userId.exists": "User ID is not exists",
    "clothType.required": "Cloth type is required",
    "location.required": "Location is required",
    "description.required": "Description is required",
    "budget.required": "Budget is required",
    "clothType.range": "Cloth type should be between 1001 and 1005",
  };
}
