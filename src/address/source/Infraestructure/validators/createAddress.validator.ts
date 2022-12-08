import joi from 'joi'

export const createAddressValidator = joi.object({
  phone: joi.string().required().min(4).max(15).messages({
    'any.required': 'phone is a required field',
    'string.empty': 'phone is not allowed to be empty',
    'string.min': 'phone must be at least 4 characters long'
  }),
  address: joi.string().min(2).max(255).messages({
    'string.empty': 'address is not allowed to be empty',
    'string.min': 'address must be at least 2 characters long',
    'string.max': ' address must be max 255 characters long'
  }),
  city: joi.string().required().min(1).max(30).messages({
    'any.required': 'city is a required field',
    'string.empty': 'city is not allowed to be empty',
    'string.min': 'city must be at least 1 characters long',
    'string.max': ' city must be max 30 characters long'
  }),
  state: joi.string().required().min(2).max(30).messages({
    'any.required': 'state is a required field',
    'string.empty': 'state is not allowed to be empty',
    'string.min': 'state must be at least 2 characters long',
    'string.max': ' state must be max 30 characters long'
  }),
  postalCode: joi.string().required().min(2).max(10).messages({
    'any.required': 'postal code is a required field',
    'string.empty': 'postal code is not allowed to be empty',
    'string.min': 'postal code must be at least 2 characters long',
    'string.max': ' postal code must be max 10 characters long'
  }),
  country: joi.string().required().min(2).max(20).messages({
    'any.required': 'country is a required field',
    'string.empty': 'country is not allowed to be empty',
    'string.min': 'country must be at least 2 characters long',
    'string.max': ' country must be max 20 characters long'
  })
})
