import { Module } from '@nestjs/common';
import { ColorSchemeModule } from '../../../../../libs/services/color-schemas/color-scheme.module';
import { LanguageSchemeControllerService } from './language-scheme-controller.service';
import { LanguageSchemeController } from './language-scheme.controller';

@Module({
  imports: [ColorSchemeModule],
  providers: [LanguageSchemeControllerService],
  controllers: [LanguageSchemeController],
})
export class LanguageSchemeControllerModule {}
