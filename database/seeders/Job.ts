import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Job from 'App/Models/Job'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Job.create({
      id: 'JOB_aaa',
      userId: 'USER_2_yyy',
      clothType: 1001,
      location: 'Kuala Lumpur',
      description: 'I need a shirt',
      budget: 100,
      status: true,
      quotationCount: 0,
    })

    await Job.create({
      id: 'JOB_bbb',
      userId: 'USER_2_yyy',
      clothType: 1002,
      location: 'Melbourne',
      description: 'I need a pants',
      budget: 200,
      status: true,
      quotationCount: 0,
    })

    await Job.create({
      id: 'JOB_ccc',
      userId: 'USER_2_yyy',
      clothType: 1003,
      location: 'Melbourne',
      description: 'I need a dress',
      budget: 666,
      status: true,
      quotationCount: 0,
    })

    await Job.create({
      id: 'JOB_ddd',
      userId: 'USER_2_zzz',
      clothType: 1004,
      location: 'Melbourne',
      description: 'I need a jacket',
      budget: 166,
      status: true,
      quotationCount: 0,
    })

    await Job.create({
      id: 'JOB_eee',
      userId: 'USER_2_zzz',
      clothType: 1005,
      location: 'Melbourne',
      description: 'I need a shoes',
      budget: 88,
      status: true,
      quotationCount: 0,
    })
  }
}
