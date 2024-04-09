import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/services/prisma/prisma.service';
import { CreateCompany } from './interface/create.company'; // Убедитесь, что такой интерфейс существует и правильно импортирован
import { UpdateCompany } from './interface/update.company'; // Также убедитесь в наличии этого интерфейса

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(companyData: CreateCompany) {
    return this.prisma.company.create({
      data: companyData,
    });
  }

  async getPage(limit: number, page: number) {
    const offset = (page - 1) * limit;
    return this.prisma.company.findMany({
      take: limit,
      skip: offset,
    });
  }

  async getById(id: number) {
    return this.prisma.company.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, companyData: UpdateCompany) {
    return this.prisma.company.update({
      where: { id: id },
      data: companyData,
    });
  }

  async delete(id: number) {
    return this.prisma.company.delete({
      where: { id: id },
    });
  }
}
