import { Injectable } from '@nestjs/common';
import * as scheme from './const/colors.json';
import { IResScheme, IResSchemeResult } from './dto/res-scheme.dto';

@Injectable()
export class ColorSchemeService {
  async getColorSchemeByLanguage(language: string): Promise<IResSchemeResult> {
    return scheme[language];
  }

  async getColorScheme(): Promise<IResScheme> {
    return scheme;
  }
}
