import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto.js';
import { Report } from './report.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}

  create(body: CreateReportDto) {
    const report = this.reportRepository.create(body);
    return this.reportRepository.save(report);
  }

  async findAll() {
    return this.reportRepository.find();
  }

  async findOne(id: string) {
    return this.reportRepository.findOne({ where: { id: Number(id) } });
  }

  async update(id: string, body: CreateReportDto) {
    await this.reportRepository.update(Number(id), body);
    return this.reportRepository.findOne({ where: { id: Number(id) } });
  }

  async delete(id: string) {
    await this.reportRepository.delete(Number(id));
  }
}
