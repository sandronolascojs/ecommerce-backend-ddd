import { Application, json, NextFunction, Request, Response } from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import customerRoutes from './customer/source/Infraestructure/route/customer.route'
import addressRoutes from './address/source/Infraestructure/route/address.route'
import administradorRoutes from './administrator/source/Infraestructure/route/administrator.route'
import orderRoutes from './order/Infraestructure/route/order.route'
import orderItemRoutes from './orderItem/Infraestructure/route/orderItem.route'
import categoryRoutes from './category/source/Infraestructure/route/category/category.route'
import subCategoryRoutes from './category/source/Infraestructure/route/subCategory/subCategory.route'
import customerAuthenticationRoutes from './authentication/Infraestructure/route/authenticationCustomer.route'

import { HttpResponse } from './shared/utils/http.response'

config()

export class Server {
  private readonly app: Application
  private readonly PORT: string = process.env.PORT ?? '3002'

  constructor (app: Application) {
    this.app = app
  }

  public getApp (): Application {
    return this.app
  }

  public middlewares (): void {
    this.app.use(json())
    this.app.use(helmet())
    this.app.use(cors({
      origin: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }))
    this.app.use(morgan('dev'))
  }

  public routes (): void {
    this.app.use('/api/v1/customers', customerRoutes)
    this.app.use('/api/v1/addresses', addressRoutes)
    this.app.use('/api/v1/administrators', administradorRoutes)
    this.app.use('/api/v1/orders', orderRoutes)
    this.app.use('/api/v1/orderItems', orderItemRoutes)
    this.app.use('/api/v1/categories', categoryRoutes)
    this.app.use('/api/v1/subcategories', subCategoryRoutes)
    this.app.use('/api/v1/authentication', customerAuthenticationRoutes)
    this.app.use('*', (_request: Request, response: Response): Response => {
      return new HttpResponse().NOT_FOUND(response, 'Not found')
    })
  }

  public errorHandler (): void {
    this.app.use((error: any, _request: Request, response: Response, _next: NextFunction): Response<Error> => {
      return new HttpResponse().INTERNAL_SERVER_ERROR(response, error.message)
    })
  }

  public start (): void {
    const app = this.getApp()
    app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`)
    })
  }

  public async init (): Promise<void> {
    this.middlewares()
    this.routes()
    this.errorHandler()
    this.start()
  }
}
