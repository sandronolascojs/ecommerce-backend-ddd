import joi from 'joi'

export const updateSubCategoryValidator = joi.object({
  name: joi.string().min(3).max(150).messages({
    'any.required': 'category name is a required field',
    'string.empty': 'category name is not allowed to be empty',
    'string.min': 'category name must be at least 3 characters long',
    'string.max': 'category name must be at most 150 characters long'
  }),
  description: joi.string().min(3).max(255).messages({
    'string.empty': 'description is not allowed to be empty',
    'string.min': 'description must be at least 3 characters long',
    'string.max': 'description must be at most 255 characters long'
  }),
  image: joi.string().messages({
    'any.required': 'image is a required field',
    'string.empty': 'image is not allowed to be empty'
  }),
  categoryId: joi.string().required().messages({
    'any.required': 'category id is a required field',
    'string.empty': 'category id is not allowed to be empty'
  })
})
