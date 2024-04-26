import { BackendExceptions } from 'libs/exceptions/backend.exceptions';
import { EErrorCode } from 'libs/exceptions/enums/error-code.enum';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';

export class DatabaseExceptions extends BackendExceptions {
  constructor(
    error: PrismaClientKnownRequestError | PrismaClientUnknownRequestError,
  ) {
    super(EErrorCode.Database, {
      messageDebug: error.message,
    });
  }
}
