import { BackendExceptions } from 'libs/exceptions/backend.exceptions';
import { HttpStatus, ValidationError } from '@nestjs/common';
import { EErrorCode } from 'libs/exceptions/enums/error-code.enum';

export class ValidateExceptions extends BackendExceptions {
  constructor(private readonly validationErrors: ValidationError[]) {
    super(EErrorCode.Validate, {
      httpCode: HttpStatus.BAD_REQUEST,
      messageUI: 'Validation error',
      messageDebug: 'Validation error',
      data: validationErrors.reduce(
        (constrains, err) => Object.assign(constrains, err.constraints),
        {},
      ),
    });
  }
}
