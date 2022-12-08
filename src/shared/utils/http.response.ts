import { Response } from 'express'

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
}

enum HttpStatusMessage {
  OK = 'Success',
  CREATED = 'Created successfuly',
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  CONFLICT = 'Conflict',
  NOT_FOUND = 'Not Found',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  NOT_IMPLEMENTED = 'Not Implemented',
  BAD_GATEWAY = 'Bad Gateway',
  SERVICE_UNAVAILABLE = 'Service Unavailable',
}

export class HttpResponse {
  public OK (response: Response, data?: any): Response {
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      error: false,
      statusMessage: HttpStatusMessage.OK,
      data
    })
  }

  public CREATED (response: Response, data?: any): Response {
    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      error: false,
      statusMessage: HttpStatusMessage.CREATED,
      data
    })
  }

  public BAD_REQUEST (response: Response, error?: any): Response {
    return response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      error: true,
      statusMessage: HttpStatusMessage.BAD_REQUEST,
      errorMessage: error
    })
  }

  public UNAUTHORIZED (response: Response, error?: any): Response {
    return response.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      error: true,
      statusMessage: HttpStatusMessage.UNAUTHORIZED,
      errorMessage: error
    })
  }

  public FORBIDDEN (response: Response, error?: any): Response {
    return response.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      error: true,
      statusMessage: HttpStatusMessage.FORBIDDEN,
      errorMessage: error
    })
  }

  public NOT_FOUND (response: Response, error?: any): Response {
    return response.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      error: true,
      statusMessage: HttpStatusMessage.NOT_FOUND,
      errorMessage: error
    })
  }

  public CONFLICT (response: Response, error?: any): Response {
    return response.status(HttpStatus.CONFLICT).json({
      status: HttpStatus.CONFLICT,
      error: true,
      statusMessage: HttpStatusMessage.CONFLICT,
      errorMessage: error
    })
  }

  public INTERNAL_SERVER_ERROR (response: Response, error?: any): Response {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: true,
      statusMessage: HttpStatusMessage.INTERNAL_SERVER_ERROR,
      errorMessage: error
    })
  }

  public NOT_IMPLEMENTED (response: Response, error?: any): Response {
    return response.status(HttpStatus.NOT_IMPLEMENTED).json({
      status: HttpStatus.NOT_IMPLEMENTED,
      error: true,
      statusMessage: HttpStatusMessage.NOT_IMPLEMENTED,
      errorMessage: error
    })
  }

  public BAD_GATEWAY (response: Response, error?: any): Response {
    return response.status(HttpStatus.BAD_GATEWAY).json({
      status: this.BAD_GATEWAY,
      error: true,
      statusMessage: HttpStatusMessage.BAD_GATEWAY,
      errorMessage: error
    })
  }

  public SERVICE_UNAVAILABLE (response: Response, error?: any): Response {
    return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      status: this.SERVICE_UNAVAILABLE,
      error: true,
      statusMessage: HttpStatusMessage.SERVICE_UNAVAILABLE,
      errorMessage: error
    })
  }
}
