const { validate, schemas } = require('../../middlewares/validation.middleware');

describe('Validation Middleware', () => {
    let mockReq;
    let mockRes;
    let mockNext;

    beforeEach(() => {
        mockReq = {
            body: {}
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        mockNext = jest.fn();
    });

    describe('validate middleware', () => {
        it('should pass validation for valid user data', () => {
            mockReq.body = {
                username: 'testuser',
                fullname: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            const validateUser = validate('createUser');
            validateUser(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(mockReq.body).toEqual(mockReq.body);
        });

        it('should fail validation for invalid email', () => {
            mockReq.body = {
                username: 'testuser',
                fullname: 'Test User',
                email: 'invalid-email',
                password: 'password123'
            };

            const validateUser = validate('createUser');
            validateUser(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Validation failed',
                timestamp: expect.any(String),
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        field: 'email',
                        message: expect.stringContaining('email')
                    })
                ])
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should fail validation for short password', () => {
            mockReq.body = {
                username: 'testuser',
                fullname: 'Test User',
                email: 'test@example.com',
                password: '123'
            };

            const validateUser = validate('createUser');
            validateUser(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Validation failed',
                timestamp: expect.any(String),
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        field: 'password',
                        message: expect.stringContaining('length')
                    })
                ])
            });
        });

        it('should return error for non-existent schema', () => {
            const validateUser = validate('nonExistentSchema');
            validateUser(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Validation schema not found',
                timestamp: expect.any(String)
            });
        });
    });

    describe('schemas', () => {
        it('should have createUser schema defined', () => {
            expect(schemas.createUser).toBeDefined();
        });

        it('should have updateUser schema defined', () => {
            expect(schemas.updateUser).toBeDefined();
        });

        it('should have login schema defined', () => {
            expect(schemas.login).toBeDefined();
        });

        it('should have createBook schema defined', () => {
            expect(schemas.createBook).toBeDefined();
        });
    });
}); 