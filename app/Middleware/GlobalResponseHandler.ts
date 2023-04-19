import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResponseContract } from '@ioc:Adonis/Core/Response'

export interface CustomResponse extends ResponseContract {
  apiSuccess(data: any, status: number, message?: string): void
  apiError(message: string, status: number): void
}

export default class GlobalResponseHandler {
  public async handle({response}: HttpContextContract & { response: CustomResponse }, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    response.apiSuccess = (data: any, status:number, message:string) => {
      response.json({
        status,
        data: data,
        message
      })
    }

    // define apiError method to send error response
    response.apiError = (message: string, status: number) => {
      response.send({
        status,
        message,
      })
    }


    await next()

  }
}
