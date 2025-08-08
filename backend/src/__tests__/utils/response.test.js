const { successResponse, errorResponse, paginatedResponse } = require('../../utils/response');

describe('Response Utilities', () => {
    let mockRes;

    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    describe('successResponse', () => {
        it('should return success response with default values', () => {
            const data = { id: 1, name: 'Test' };
            successResponse(mockRes, data);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Success',
                data: { id: 1, name: 'Test' },
                timestamp: expect.any(String)
            });
        });

        it('should return success response with custom message and status', () => {
            const data = { id: 1 };
            successResponse(mockRes, data, 'Custom message', 201);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Custom message',
                data: { id: 1 },
                timestamp: expect.any(String)
            });
        });
    });

    describe('errorResponse', () => {
        it('should return error response with default values', () => {
            errorResponse(mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Error',
                timestamp: expect.any(String)
            });
        });

        it('should return error response with custom message, status and errors', () => {
            const errors = [{ field: 'email', message: 'Invalid email' }];
            errorResponse(mockRes, 'Validation failed', 400, errors);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Validation failed',
                timestamp: expect.any(String),
                errors: [{ field: 'email', message: 'Invalid email' }]
            });
        });
    });

    describe('paginatedResponse', () => {
        it('should return paginated response', () => {
            const data = [{ id: 1 }, { id: 2 }];
            paginatedResponse(mockRes, data, 1, 10, 20);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Data retrieved successfully',
                data: [{ id: 1 }, { id: 2 }],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 20,
                    totalPages: 2,
                    hasNextPage: true,
                    hasPrevPage: false
                },
                timestamp: expect.any(String)
            });
        });

        it('should handle last page correctly', () => {
            const data = [{ id: 19 }, { id: 20 }];
            paginatedResponse(mockRes, data, 2, 10, 20);

            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'Data retrieved successfully',
                data: [{ id: 19 }, { id: 20 }],
                pagination: {
                    page: 2,
                    limit: 10,
                    total: 20,
                    totalPages: 2,
                    hasNextPage: false,
                    hasPrevPage: true
                },
                timestamp: expect.any(String)
            });
        });
    });
}); 