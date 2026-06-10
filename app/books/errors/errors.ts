export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends AppError {
  static readonly STATUS_CODE = 400;
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  static readonly STATUS_CODE = 401;
  constructor(message = "Not authorized") {
    super(message, 401);
  }
}

export class NotFoundError extends AppError {
  static readonly STATUS_CODE = 404;
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  static readonly STATUS_CODE = 409;
  constructor(message = "Resource conflict") {
    super(message, 409);
  }
}

export class GoneError extends AppError {
  static readonly STATUS_CODE = 410;
  constructor(message = "The resource is no longer available") {
    super(message, 410);
  }
}

export class UnsupportedMediaTypeError extends AppError {
  static readonly STATUS_CODE = 415;
  constructor(message = "Unsupported media type") {
    super(message, 415);
  }
}

export class InternalServerError extends AppError {
  static readonly STATUS_CODE = 500;
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}
