const Joi = require('joi');

const categoryValidators = {
  createCategory: Joi.object({
    name: Joi.string()
      .min(1)
      .max(50)
      .required()
      .messages({
        'string.empty': 'Category name is required',
        'string.max': 'Category name cannot exceed 50 characters'
      }),
    
    description: Joi.string()
      .max(200)
      .required()
      .messages({
        'string.empty': 'Category description is required',
        'string.max': 'Category description cannot exceed 200 characters'
      }),
    
    icon: Joi.string()
      .max(10)
      .optional(),
    
    parentCategoryId: Joi.string()
      .optional(),
    
    isActive: Joi.boolean()
      .default(true)
  }),

  updateCategory: Joi.object({
    name: Joi.string()
      .min(1)
      .max(50)
      .optional(),
    
    description: Joi.string()
      .max(200)
      .optional(),
    
    icon: Joi.string()
      .max(10)
      .optional(),
    
    parentCategoryId: Joi.string()
      .optional(),
    
    isActive: Joi.boolean()
      .optional()
  }),

  searchCategories: Joi.object({
    keyword: Joi.string()
      .optional(),
    
    parentCategoryId: Joi.string()
      .optional(),
    
    isActive: Joi.boolean()
      .optional(),
    
    page: Joi.number()
      .min(1)
      .default(1),
    
    limit: Joi.number()
      .min(1)
      .max(100)
      .default(10)
  })
};

module.exports = categoryValidators; 