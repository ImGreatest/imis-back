// company.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'libs/entity/company';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ReqUpdateCompany } from './req-dto/company.update.dto';
import { User } from 'libs/entity/user';
import { ReqCompanyCreate } from './req-dto/company.create.dto';


@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getCompanyById(id: number): Promise<Company> {
    return await this.companyRepository.findOne({ where: { id } });
  }

  async getAllCompanies(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async getCompanyByRole(role: string): Promise<Company[]> {
    return await this.companyRepository.createQueryBuilder("company")
                       .where("company.role = :role", { role })
                       .getMany();
  }

  async updateCompanyByRole(role: string, updatedData: ReqUpdateCompany): Promise<Company[]> {
    await this.companyRepository.createQueryBuilder()
                       .update(Company)
                       .set(updatedData)
                       .where("role = :role", { role })
                       .execute();

    return this.getCompanyByRole(role);
  }
  async deleteCompanyByUserId(userId: number): Promise<void> {
    const company = await this.getCompanyById(userId);
    if (company) {
      await this.companyRepository.remove(company);
    }
  }
  async createCompany(role: string, company: ReqCompanyCreate): Promise<Company> {
    const newCompany = this.companyRepository.create(company);
    return await this.companyRepository.save(newCompany);
}
}
