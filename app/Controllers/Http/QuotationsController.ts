import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Quotation from 'App/Models/Quotation';

export default class QuotationsController {
    /**
     * show all quotations under a job id
     * @param param0 
     * @returns 
     */
    public async index({params, response}: HttpContextContract) {
        const quotations = await Quotation.query()
            .where('job_id', params.jobId)
            .orderBy('created_at', 'desc');
        return response.json({quotations});
    }
    

    /**
     * create a new quotation under a job id and user id
     * @param param0 
     * @returns 
     */
    public async store({params, request, response}: HttpContextContract) {
        const validatedData = {
            userId: request.input('user_id'),
            bit: request.input('bit'),
            status: request.input('status'),
            message: request.input('message')
        };
        const quotation = new Quotation();
        quotation.jobId = params.jobId;
        quotation.userId = validatedData.userId;
        quotation.bit = validatedData.bit;
        quotation.status = validatedData.status;
        quotation.message = validatedData.message;
        await quotation.save();
        return response.status(201).json({quotation});
    }
    
    
    /**
     * show a quotation by quotation id
     * @param param0 
     * @returns 
     */
    public async show({params, response}: HttpContextContract) {
        try {
            const quotation = await Quotation.findOrFail(params.quotationId);
            return response.json({quotation});
        } catch (error) {
            return response.status(404).json({message: 'Quotation not found'});
        }
    }
    
    
    /**
     * update a quotation by quotation id
     * @param param0 
     * @returns 
     */
    public async update({params, request, response}: HttpContextContract) {
        const validatedData = {
            userId: request.input('user_id'),
            bit: request.input('bit'),
            status: request.input('status'), 
            message: request.input('message')
        };
        try {
            const quotation = await Quotation.findOrFail(params.quotationId);
            quotation.userId = validatedData.userId;
            quotation.bit = validatedData.bit;
            quotation.status = validatedData.status;
            quotation.message = validatedData.message;
            await quotation.save();
            return response.json({quotation});
        }
        catch (error) {
            return response.status(404).json({message: 'Quotation not found'});
        }
    }
    

    /**
     * delete a Quotation by its id
     * @param param0 
     */
    public async destroy({params, response}: HttpContextContract) {
        try {
            const quotation = await Quotation.findOrFail(params.quotationId);
            await quotation.delete();
            return response.status(204).json({message: 'Quotation deleted'});
        } catch (error) {
            return response.status(404).json({message: 'Quotation not found'});
        }
        
    }
}
