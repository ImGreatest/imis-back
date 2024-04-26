import { EErrorCode } from 'libs/exceptions/enums/error-code.enum';
import { IError } from 'libs/exceptions/interfaces/error.interface';
import { HttpStatus } from '@nestjs/common';

export const errorCodeDeclaration: {
  [key in EErrorCode]: IError;
} = {
  [EErrorCode.Database]: {
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
    messageUI: 'Database Error',
  },
  [EErrorCode.NotFound]: {
    httpCode: HttpStatus.NOT_FOUND,
    messageUI: 'Not Found',
  },
  [EErrorCode.Unknown]: {
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
    messageUI: 'Unknown Error',
  },
  [EErrorCode.Validate]: {
    httpCode: HttpStatus.BAD_REQUEST,
    messageUI: 'Validate Error',
  },
  [EErrorCode.Forbidden]: {
    httpCode: HttpStatus.FORBIDDEN,
    messageUI: 'Forbidden Error',
  },
  [EErrorCode.Unauthorized]: {
    httpCode: HttpStatus.UNAUTHORIZED,
    messageUI: 'Authorization error',
  },
};
