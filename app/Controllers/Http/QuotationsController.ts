import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { CustomResponse } from "App/Middleware/GlobalResponseHandler";
import Job from "App/Models/Job";
import Quotation from "App/Models/Quotation";
import QuoteValidator from "App/Validators/QuoteValidator";

export default class QuotationsController {
  /**
   * list all quotations, filter by quotation status
   * @param param0
   * @returns
   */
  public async index({ request, response }: HttpContextContract) {
    const { page, limit, status } = request.qs();

    const quoteQuery = Quotation.query()
      .select("quotations.*")
      .orderBy("created_at", "desc");

    // Filter by status
    if (status) {
      quoteQuery.where("status", status);
    }

    // Paginate the results
    const quotes = await quoteQuery.paginate(page || 1, limit || 10);
    return response.json({ quotes });
  }

  /**
   * create a new quotation under a job id by user
   * @param param0
   * @returns
   */
  public async store({
    params,
    request,
    response,
  }: HttpContextContract & { response: CustomResponse }) {
    try {
      const quoteQuery = request.all();
      quoteQuery.jobId = params.jobId;
      quoteQuery.userId = request.input("user_id");

      await request.validate(QuoteValidator);
      const quotation = await Quotation.create(quoteQuery);

      const job = await Job.findOrFail(params.jobId);
      job.quotationCount++;
      await job.save();

      return response.apiSuccess(
        quotation,
        response.response.statusCode,
        "Quotation created successfully"
      );
    } catch (error) {
      return response.apiError(error.message.split(": ")[1], error.status);
    }
  }

  /**
   * show a quotation by quotation id
   * @param param0
   * @returns
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const quotation = await Quotation.findOrFail(params.quotationId);
      return response.json({ quotation });
    } catch (error) {
      return response.status(404).json({ message: "Quotation not found" });
    }
  }

  /**
   * show all quotations by a user id or job id
   * @param param0
   * @returns
   */
  public async showAll({ params, response }: HttpContextContract  & { response: CustomResponse }) {
    let prefix = params.id.substring(0, 4);
    let flag: number;

    if (prefix === "JOB_") {
      flag = 1;
    } else if (prefix === "USER") {
      flag = 0;
    } else {
      return response.apiError( "Invalid id", 400)
    }

    try {
      const quotations = await Quotation.query()
        .where(flag ? "job_id" : "user_id", params.id)
        .orderBy("created_at", "desc");

      if (quotations.length === 0) {
        return response.json({
          quotations,
          message: "No quotations found",
        });
      }

      return response.apiSuccess( quotations, response.response.statusCode, "Quotations retrieved successfully")
    } catch (error) {
      return response.apiError(error.message.split(": ")[1], error.status);
    }
  }

  /**
   * update a status only by user(consumer who created the job)(pending, accepted or rejected)
   * @param param0
   * @returns
   */
  public async update({ params, request, response }: HttpContextContract) {
    const quote = await Quotation.findOrFail(params.quotationId);
    if (!quote) {
      return response.status(404).json({ message: "Quotation not found" });
    }

    const job = await Job.findOrFail(quote.jobId);
    if (!job) {
      return response.status(404).json({ message: "Job not found" });
    }

    if (job.userId !== params.userId) {
      return response.status(400).json({ message: "Invalid user id" });
    }

    quote.status = request.input("status");
    await quote.save();

    return response.json({
      quote,
      message: "Quotation status updated successfully",
    });
  }
}
