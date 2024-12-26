


export class BadRequestException extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message),
        this.statusCode = 400
    };
};

export class NotFoundException extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message),
        this.statusCode = 404
    };
};

export class UnauthorizedException extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message),
        this.statusCode = 401
    };
};

export class ConflicException extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message),
        this.statusCode = 409
    };
};