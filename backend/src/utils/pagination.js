/**
 * Pagination utility functions
 */

/**
 * Create pagination result
 * @param {Array} data - Array of data
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} Pagination result
 */
const createPaginationResult = (data, page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    data,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages,
      hasNextPage,
      hasPrevPage
    }
  };
};

/**
 * Paginate mongoose query
 * @param {Object} model - Mongoose model
 * @param {Object} query - Query object
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} Pagination result
 */
const paginate = async (model, query = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    populate = null,
    select = null
  } = options;

  const skip = (page - 1) * limit;

  // Build query
  let mongooseQuery = model.find(query);

  // Apply populate if provided
  if (populate) {
    if (Array.isArray(populate)) {
      populate.forEach(pop => {
        mongooseQuery = mongooseQuery.populate(pop);
      });
    } else {
      mongooseQuery = mongooseQuery.populate(populate);
    }
  }

  // Apply select if provided
  if (select) {
    mongooseQuery = mongooseQuery.select(select);
  }

  // Apply sort
  mongooseQuery = mongooseQuery.sort(sort);

  // Execute query with pagination
  const [data, total] = await Promise.all([
    mongooseQuery.skip(skip).limit(limit).lean(),
    model.countDocuments(query)
  ]);

  return createPaginationResult(data, page, limit, total);
};

/**
 * Paginate aggregation pipeline
 * @param {Object} model - Mongoose model
 * @param {Array} pipeline - Aggregation pipeline
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} Pagination result
 */
const paginateAggregate = async (model, pipeline = [], options = {}) => {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;

  // Create count pipeline
  const countPipeline = [...pipeline, { $count: 'total' }];

  // Create data pipeline
  const dataPipeline = [
    ...pipeline,
    { $skip: skip },
    { $limit: limit }
  ];

  // Execute both pipelines
  const [countResult, data] = await Promise.all([
    model.aggregate(countPipeline),
    model.aggregate(dataPipeline)
  ]);

  const total = countResult[0]?.total || 0;

  return createPaginationResult(data, page, limit, total);
};

/**
 * Get pagination metadata
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} Pagination metadata
 */
const getPaginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages,
    hasNextPage,
    hasPrevPage
  };
};

module.exports = {
  createPaginationResult,
  paginate,
  paginateAggregate,
  getPaginationMeta
}; 