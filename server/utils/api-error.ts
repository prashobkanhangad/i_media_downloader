export class ApiException extends Error {
  constructor(
    message: string,
    public readonly status: number = 400,
  ) {
    super(message);
    this.name = "ApiException";
  }
}

export class ValidationException extends ApiException {
  constructor(message: string) {
    super(message, 400);
    this.name = "ValidationException";
  }
}

export class NotFoundException extends ApiException {
  constructor(message = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundException";
  }
}

export class InternalServerException extends ApiException {
  constructor(message = "Internal server error") {
    super(message, 500);
    this.name = "InternalServerException";
  }
}
