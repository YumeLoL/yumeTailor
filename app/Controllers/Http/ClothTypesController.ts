import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClothType from 'App/Models/ClothType'

export default class ClothTypesController {
    public async index({ response }: HttpContextContract) {
        const clothTypes = await ClothType.all()
        return response.json(clothTypes)
    }
}
