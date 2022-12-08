import joi from 'joi'

export const createCustomerValidator = joi.object({
  firstname: joi.string().required().min(3).messages({
    'any.required': 'firstname is a required field',
    'string.empty': 'firstname is not allowed to be empty',
    'string.min': 'firstname must be at least 3 characters long'
  }),
  lastname: joi.string().required().min(3).messages({
    'any.required': 'lastname is a required field',
    'string.empty': 'lastname is not allowed to be empty',
    'string.min': 'lastname must be at least 3 characters long'
  }),
  email: joi.string().email().required().messages({
    'any.required': 'email is a required field',
    'string.email': 'email must be a valid email',
    'string.empty': 'email is not allowed to be empty'
  }),
  password: joi.string().required().min(6).messages({
    'string.empty': 'password must contain value',
    'any.required': 'password is a required field'
  })
})
