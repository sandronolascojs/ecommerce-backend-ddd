import joi from 'joi'

export const detailsCustomerValidator = joi.object({
  email: joi.string().email().required().messages({
    'any.required': 'email is a required field',
    'string.email': 'email must be a valid email',
    'string.empty': 'email is not allowed to be empty'
  })
})
