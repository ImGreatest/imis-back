import { Injectable } from '@nestjs/common';
import { ColorSchemeService } from 'libs/services/color-schemas/color-scheme.service';
import { ResScheme, ResSchemeResult } from './dto/res-scheme.dto';

@Injectable()
export class LanguageSchemeControllerService {
  constructor(private readonly colorSchemeService: ColorSchemeService) {}
x
  getColorSchemeByLanguage(language: string): Promise<ResSchemeResult> {
    return this.colorSchemeService.getColorSchemeByLanguage(language);
  }

  getColorScheme(): Promise<ResScheme> {
    return this.colorSchemeService.getColorScheme();
  }
}
