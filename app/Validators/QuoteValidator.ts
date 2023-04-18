import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class QuoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    jobId: schema.string.optional({}, [rules.exists({ table: "jobs", column: "id" })]),
    userId: schema.string.optional({}, [rules.exists({ table: "users", column: "id" })]),
    bit: schema.number([rules.required()]),
    status: schema.number([rules.required(), rules.range(2001, 2003)]),
    message: schema.string({}, [rules.maxLength(255)]),
  });

  public messages: CustomMessages = {
    "jobId.exists": "Job ID is not exists",
    "userId.exists": "User ID is not exists",
    "bit.required": "Bit is required",
    "status.required": "Status is required",
    "status.range": "Status should be between 2001 and 2003",
    "message.maxLength": "Message should be less than 255 characters",
  };
}
