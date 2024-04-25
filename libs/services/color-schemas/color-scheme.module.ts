import { Module } from "@nestjs/common";
import { ColorSchemeService } from "./color-scheme.service";

@Module({
	providers: [ColorSchemeService],
	exports: [ColorSchemeService]
})
export class ColorSchemeModule {}
