import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';

export interface IError {
  httpCode?: ErrorHttpStatusCode;
  messageUI?: string;
  messageDebug?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
