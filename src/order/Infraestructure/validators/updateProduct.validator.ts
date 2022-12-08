import joi from 'joi'

export const updateProductValidator = joi.object({
  name: joi.string().min(3).messages({
    'any.required': 'product name is a required field',
    'string.empty': 'product name is not allowed to be empty',
    'string.min': 'product name must be at least 3 characters long'
  }),
  description: joi.string().min(4).max(255).messages({
    'string.empty': 'description is not allowed to be empty',
    'string.min': 'description must be at least 4 characters long',
    'string.max': ' description must be max 255 characters long'
  }),
  price: joi.number().min(0).messages({
    'any.required': 'price is a required field',
    'number.base': 'price must be a number',
    'number.min': 'price must be greater than or equal to 0'
  }),
  image: joi.string().default('https://www.freeiconspng.com/img/23487').messages({
    'string.empty': 'image is not allowed to be empty'
  }),
  categoryId: joi.string().required().messages({
    'any.required': 'category is a required field',
    'string.empty': 'category is not allowed to be empty'
  }),
  subCategoryId: joi.string().required().messages({
    'any.required': 'sub category is a required field',
    'string.empty': 'sub category is not allowed to be empty'
  })
})
