import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterUserDto {
  public email: string
  public password: string
  public roleId: number

  public static async fromRequest(request: HttpContextContract['request']): Promise<RegisterUserDto> {
    const validatedData = await request.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.email(),
          rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string({}, [rules.minLength(6)]),
        roleId: schema.number([rules.exists({ table: 'roles', column: 'id' })]),
      }),
    })

    const dto = new RegisterUserDto()
    dto.email = validatedData.email
    dto.password = validatedData.password
    dto.roleId = validatedData.roleId
    return dto
  }
}
