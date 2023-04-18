import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.create({
      id: 'USER_1_xxx',
      email: 'admin1@example.com',
      password: 'password',
      role: Roles.ADMIN,
    })

    await User.create({
      id: 'USER_2_yyy',
      email: 'consumer1@example.com',
      password: 'password',
      role: Roles.CONSUMER,
    })

    await User.create({
      id: 'USER_2_zzz',
      email: 'consumer2@example.com',
      password: 'password',
      role: Roles.CONSUMER,
    })

    await User.create({
      id: 'USER_3_www',
      email: 'maker1@example.com',
      password: 'password',
      role: Roles.MAKER,
    })

    await User.create({
      id: 'USER_3_mmm',
      email: 'maker2@example.com',
      password: 'password',
      role: Roles.MAKER,
    })
  }
}
