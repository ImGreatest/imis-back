// company.controller.ts
import {
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    Query, Body,
    Res,
    HttpStatus
  } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Response } from 'express';
import { ReqUpdateCompany } from './req-dto/company.update.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReqCompanyCreate } from './req-dto/company.create.dto';


@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @ApiOperation({ description: 'Получить все компании' })
  @Get('get-list')
  async getAllCompanies(@Res() res: Response): Promise<void> {
    try {
      const companies = await this.companyService.getAllCompanies();
      res.status(HttpStatus.OK).json(companies);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ошибка при получении данных о компаниях' });
    }
  }

  @ApiOperation({ description: 'Получить компанию по id' })
  @Get('get-page')
  async getCompaniesByRole(@Param('role') role: string, @Res() res: Response): Promise<void> {
    try {
      const companies = await this.companyService.getCompanyByRole(role);
      res.status(HttpStatus.OK).json(companies);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ошибка при получении данных о компаниях' });
    }
  }

@ApiOperation({description: 'Удалить компанию по id'})
  @Delete('delete-company')
  async deleteCompany(@Param('userId') userId: number, @Res() res: Response) {
    try {
      await this.companyService.deleteCompanyByUserId(userId);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @ApiOperation({description: 'Обновить данные компании'})
  @Patch('update-company')
  async updateCompanyByRole(
    @Param('role') role: string, 
    @Body() updatedData : ReqUpdateCompany, 
    @Res() res: Response
  ) {
    try {
      const updatedCompanies = await this.companyService.updateCompanyByRole(role, updatedData);
      res.status(HttpStatus.OK).json(updatedCompanies);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ошибка при обновлении компании' });
    }
  }

  @ApiOperation({description: 'Создать компанию'})
  @Patch('create-company')
  async createCompany(
    @Param('role') role: string,
    @Body() company: ReqCompanyCreate,
    @Res() res: Response
  )
  {
    try {
      const createdCompany = await this.companyService.createCompany(role, company);
      res.status(HttpStatus.CREATED).json(createdCompany);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ошибка при создании компании' });
    }
  }
  // Другие методы остались без изменений
}
