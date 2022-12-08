import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'
import { HttpResponse } from '../../../../shared/utils/http.response'

export const schemaValidator = (schema: ObjectSchema) => (request: Request, response: Response, next: NextFunction) => {
  const result = schema.validate(request.body)

  if (result.error !== undefined) {
    return new HttpResponse().BAD_REQUEST(response, result.error?.details[0].message)
  }

  next()
}
