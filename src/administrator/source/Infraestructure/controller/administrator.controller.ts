import { CreateAdministratorUseCase } from '../../Application/createAdministratorUseCase'
import { GetAdministratorByEmailUseCase } from '../../Application/getAdministratorByEmailUseCase'
import { GetAdministratorByIdUseCase } from '../../Application/getAdministratorByIdUseCase'
import { UpdateAdministratorByIdUseCase } from '../../Application/updateAdministratorByUseCase'
import { DeleteAdministratorByIdUseCase } from '../../Application/deleteAdministratorByIdUseCase'
import { Request, Response } from 'express'
import { AdministratorEntity, AdministratorRole, AdministratorStatus } from '../../Domain/administrator.entity'
import { HttpResponse } from '../../../../shared/utils/http.response'
import { GetAdministratorsUseCase } from '../../Application/getAdministratorsUseCase'

export class AdministratorController {
  constructor (
    private readonly createAdministratorUseCase: CreateAdministratorUseCase,
    private readonly getAdministratorsUseCase: GetAdministratorsUseCase,
    private readonly getAdministratorByEmailUseCase: GetAdministratorByEmailUseCase,
    private readonly getAdministratorByIdUseCase: GetAdministratorByIdUseCase,
    private readonly updateAdministratorByIdUseCase: UpdateAdministratorByIdUseCase,
    private readonly deleteAdministratorByIdUseCase: DeleteAdministratorByIdUseCase
  ) { }

  public getAdministrators = async (_request: Request, response: Response): Promise<Response<AdministratorEntity[]>> => {
    const administrators = await this.getAdministratorsUseCase.execute()

    if (administrators === null) return new HttpResponse().NOT_FOUND(response, 'administrators not found')

    return new HttpResponse().OK(response, administrators)
  }

  public createAdministrator = async (request: Request, response: Response): Promise<Response<AdministratorEntity>> => {
    const { firstname, lastname, email, password, role, status } = request.body

    if (status !== AdministratorStatus) return new HttpResponse().CONFLICT(response, 'invalid status type')
    if (role !== AdministratorRole) return new HttpResponse().CONFLICT(response, 'invalid role type')

    const administratorCreated = await this.createAdministratorUseCase.execute({ firstname, lastname, email, password, role, status })

    if (administratorCreated === null) return new HttpResponse().CONFLICT(response, 'conflict')

    return new HttpResponse().CREATED(response, {
      email: administratorCreated.email,
      firstname: administratorCreated.firstname,
      lastname: administratorCreated.lastname
    })
  }

  public getAdministratorById = async (request: Request, response: Response): Promise<Response<AdministratorEntity>> => {
    const { id } = request.params

    const administrator = await this.getAdministratorByIdUseCase.execute(id)
    if (administrator === null) return new HttpResponse().NOT_FOUND(response, 'administrator not found')

    return new HttpResponse().OK(response, administrator)
  }

  public getAdministratorByEmail = async (request: Request, response: Response): Promise<Response<AdministratorEntity>> => {
    const { email } = request.params

    const administrator = await this.getAdministratorByEmailUseCase.execute(email)
    if (administrator === null) return new HttpResponse().NOT_FOUND(response, 'administrator not found')

    return new HttpResponse().OK(response, administrator)
  }

  public updateAdministratorById = async (request: Request, response: Response): Promise<Response<AdministratorEntity>> => {
    const { id } = request.params
    const { firstname, lastname, email, password, role, status } = request.body

    if (status !== AdministratorStatus) return new HttpResponse().CONFLICT(response, 'invalid status type')
    if (role !== AdministratorRole) return new HttpResponse().CONFLICT(response, 'invalid role type')

    const administratorUpdated = await this.updateAdministratorByIdUseCase.execute(id, { firstname, lastname, email, password, role, status })
    if (administratorUpdated === null) return new HttpResponse().NOT_FOUND(response, 'administrator not found')

    return new HttpResponse().OK(response, administratorUpdated)
  }

  public deleteAdministratorById = async (request: Request, response: Response): Promise<Response<AdministratorEntity>> => {
    const { id } = request.params

    const administratorDeleted = await this.deleteAdministratorByIdUseCase.execute(id)
    if (administratorDeleted === null) return new HttpResponse().NOT_FOUND(response, 'administrator not found')

    return new HttpResponse().OK(response)
  }
}
