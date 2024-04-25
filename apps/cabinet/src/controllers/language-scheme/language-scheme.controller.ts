import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LanguageSchemeControllerService } from './language-scheme-controller.service';
import { ResScheme, ResSchemeResult } from './dto/res-scheme.dto';

@ApiTags('language-scheme')
@Controller('language-scheme')
export class LanguageSchemeController {
  constructor(
    private readonly colorSchemeService: LanguageSchemeControllerService,
  ) {}

  @Get('get-color-scheme-by-language')
  getColorSchemeByLanguage(
    @Param('language') language: string,
  ): Promise<ResSchemeResult> {
    return this.colorSchemeService.getColorSchemeByLanguage(language);
  }

  @Get('get-color-scheme')
  getColorScheme(): Promise<ResScheme> {
    return this.colorSchemeService.getColorScheme();
  }
}
