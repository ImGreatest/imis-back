import { Module } from "@nestjs/common";
import { CompanyService } from "libs/domains/company/company.service";
import { CompanyController } from "./company.controller";

@Module({
    imports: [],
    providers: [CompanyService],
    controllers: [CompanyController],
})
export class CompanyModule {}