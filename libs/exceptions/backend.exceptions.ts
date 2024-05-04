import { Injectable } from '@nestjs/common';
import { IError } from 'libs/exceptions/interfaces/error.interface';
import { EErrorCode } from 'libs/exceptions/enums/error-code.enum';
import { errorCodeDeclaration } from 'libs/exceptions/declarations/error-code.declaration';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class BackendExceptions extends Error {
  public readonly code: EErrorCode;
  public readonly httpCode: ErrorHttpStatusCode;
  public readonly messageUI: string;
  public readonly messageDebug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly data: any;

  constructor(code: EErrorCode, data?: IError) {
    const error: IError = errorCodeDeclaration[code];
    super(data?.messageDebug ?? error.messageDebug);
    this.code = code;
    this.httpCode = data?.httpCode ?? error.httpCode;
    this.messageUI = data?.messageUI ?? error.messageUI;
    this.messageDebug = data?.messageDebug ?? error.messageDebug;
    this.data = data?.data ?? error.data ?? {};
  }
}
