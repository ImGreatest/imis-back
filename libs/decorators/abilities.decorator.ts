import { SetMetadata } from '@nestjs/common';

export const CHECK_ABILITY = 'check_ability';

export interface RequiredRule {
  action: string;
  subject: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conditions?: any;
}

export const checkAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
