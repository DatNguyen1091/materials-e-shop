const Joi = require('joi');

const productValidators = {
  createProduct: Joi.object({
    name: Joi.string()
      .min(1)
      .max(255)
      .required()
      .messages({
        'string.empty': 'Product name is required',
        'string.max': 'Product name cannot exceed 255 characters'
      }),
    
    price: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative'
      }),
    
    originalPrice: Joi.number()
      .min(0)
      .optional(),
    
    discount: Joi.number()
      .min(0)
      .max(100)
      .optional(),
    
    description: Joi.string()
      .max(2000)
      .optional(),
    
    imageUrl: Joi.string()
      .max(255)
      .optional(),
    
    images: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().uri().required(),
          alt: Joi.string().max(100).optional(),
          isPrimary: Joi.boolean().optional()
        })
      )
      .optional(),
    
    categoryId: Joi.string()
      .required()
      .messages({
        'string.empty': 'Category is required'
      }),
    
    brand: Joi.string()
      .max(100)
      .optional(),
    
    sku: Joi.string()
      .max(50)
      .optional(),
    
    quantity: Joi.number()
      .min(0)
      .default(0),
    
    rating: Joi.number()
      .min(0)
      .max(5)
      .default(0),
    
    specs: Joi.object()
      .optional(),
    
    tags: Joi.array()
      .items(Joi.string().max(50))
      .optional(),
    
    isFeatured: Joi.boolean()
      .optional()
  }),

  updateProduct: Joi.object({
    name: Joi.string()
      .min(1)
      .max(255)
      .optional(),
    
    price: Joi.number()
      .min(0)
      .optional(),
    
    originalPrice: Joi.number()
      .min(0)
      .optional(),
    
    discount: Joi.number()
      .min(0)
      .max(100)
      .optional(),
    
    description: Joi.string()
      .max(2000)
      .optional(),
    
    imageUrl: Joi.string()
      .max(255)
      .optional(),
    
    images: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().uri().required(),
          alt: Joi.string().max(100).optional(),
          isPrimary: Joi.boolean().optional()
        })
      )
      .optional(),
    
    categoryId: Joi.string()
      .optional(),
    
    brand: Joi.string()
      .max(100)
      .optional(),
    
    sku: Joi.string()
      .max(50)
      .optional(),
    
    quantity: Joi.number()
      .min(0)
      .optional(),
    
    rating: Joi.number()
      .min(0)
      .max(5)
      .optional(),
    
    specs: Joi.object()
      .optional(),
    
    tags: Joi.array()
      .items(Joi.string().max(50))
      .optional(),
    
    isActive: Joi.boolean()
      .optional(),
    
    isFeatured: Joi.boolean()
      .optional()
  }),

  searchProducts: Joi.object({
    keyword: Joi.string()
      .optional(),
    
    categoryId: Joi.string()
      .optional(),
    
    minPrice: Joi.number()
      .min(0)
      .optional(),
    
    maxPrice: Joi.number()
      .min(0)
      .optional(),
    
    brand: Joi.string()
      .optional(),
    
    inStock: Joi.boolean()
      .optional(),
    
    isFeatured: Joi.boolean()
      .optional(),
    
    sortBy: Joi.string()
      .valid('price', 'name', 'rating', 'createdAt')
      .optional(),
    
    sortOrder: Joi.string()
      .valid('asc', 'desc')
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

module.exports = productValidators; 