import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Image from "App/Models/Image";

export default class ImagesController {
  public async upload({ params, request }: HttpContextContract) {
    const file = request.file("image");

    const image = new Image();
    image.jobId = params.jobId;
    image.originalName = file?.clientName!;
    image.path = file?.tmpPath!;
    image.size = file?.size!;
    await image.save();

    return { success: true, message: "Image uploaded successfully" };
  }
}
