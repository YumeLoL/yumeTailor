import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Quotation from 'App/Models/Quotation'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Quotation.create({
      id: 'QUOTE_axy',
      jobId: 'JOB_aaa',
      userId: 'USER_3_www',
      bid: 100,
      status: 2001,
      message: 'I can do it'
    })

    await Quotation.create({
      id: 'QUOTE_geljr',
      jobId: 'JOB_bbb',
      userId: 'USER_3_mmm',
      bid: 200,
      status: 2001,
      message: 'I can do it'
    })

    await Quotation.create({
      id: 'QUOTE_42wetw',
      jobId: 'JOB_aaa',
      userId: 'USER_3_mmm',
      bid: 60,
      status: 2001,
      message: 'I can do it as well '
    })

    await Quotation.create({
      id: 'QUOTE_geljr',
      jobId: 'JOB_ddd',
      userId: 'USER_3_mmm',
      bid: 120,
      status: 2001,
      message: 'I can do it'
    })
  }
}
