import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.create({
      id: 'ADMIN_1',
      email: 'admin1@example.com',
      password: 'password',
      role: Roles.ADMIN,
    })

    await User.create({
      id: 'CONSUMER_1',
      email: 'consumer1@example.com',
      password: 'password',
      role: Roles.CONSUMER,
    })

    await User.create({
      id: 'CONSUMER_2',
      email: 'consumer2@example.com',
      password: 'password',
      role: Roles.CONSUMER,
    })

    await User.create({
      id: 'MAKER_1',
      email: 'maker1@example.com',
      password: 'password',
      role: Roles.MAKER,
    })
  }
}
