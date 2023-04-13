import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from 'App/Models/Job'

export default class JobsController {
    public async index({ params, response }: HttpContextContract) {
        const jobs = await Job.query().where('userId', params.id).orderBy('createdAt', 'desc')
        return response.json({ jobs })
      }

      public async store({ params, request, response }: HttpContextContract) {
        const userId = params.userId
        const jobData = request.all()

        const job = await Job.create({ ...jobData, userId })
        return response.json({ job })
      }

}
