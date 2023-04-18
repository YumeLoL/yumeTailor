import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class QuoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    jobId: schema.string.optional({}, [rules.required()]),
    userId: schema.string.optional({}, [rules.required()]),
    bit: schema.number([rules.required()]),
    status: schema.number([rules.required(), rules.range(2001, 2003)]),
    message: schema.string({}, [rules.maxLength(255)]),
  });

  public messages: CustomMessages = {
    "jobId.required": "Job ID is required",
    "userId.required": "User ID is required",
    "bit.required": "Bit is required",
    "status.required": "Status is required",
    "message.required": "Message is required",
    "bit.range": "Bit should be between 1 and 100",
    "id.uuid": "Invalid UUID format",
  };
}
