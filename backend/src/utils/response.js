/**
 * Standardized response utilities
 */

const successResponse = (res, data = null, message = 'Success', status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    });
};

const errorResponse = (res, message = 'Error', status = 500, errors = null) => {
    const response = {
        success: false,
        message,
        timestamp: new Date().toISOString()
    };

    if (errors) {
        response.errors = errors;
    }

    return res.status(status).json(response);
};

const paginatedResponse = (res, data, page, limit, total) => {
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return res.status(200).json({
        success: true,
        message: 'Data retrieved successfully',
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage,
            hasPrevPage
        },
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    successResponse,
    errorResponse,
    paginatedResponse
}; 