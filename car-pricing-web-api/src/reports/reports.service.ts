import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto.js';
import { Report } from './report.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity.js';
import { ApproveReportDto } from './dtos/approve-report.dto.js';
import { GetEstimateDto } from './dtos/get-estimate.dto.js';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}

  create(body: CreateReportDto, user: User) {
    const report = this.reportRepository.create(body);
    report.user = user;
    return this.reportRepository.save(report);
  }

  getEstimate(query: GetEstimateDto) {
    // Implementation for getting estimate
    return this.reportRepository
      .createQueryBuilder()
      .select('AVG(price)','price')
      .where('make = :make', { make: query.make })
      .andWhere('model = :model', { model: query.model })
      .andWhere('lng - :lng BETWEEN :minLng AND :maxLng', {
        lng: query.lng,
        minLng: -5,
        maxLng: 5,
      })
      .andWhere('lat - :lat BETWEEN :minLat AND :maxLat', {
        lat: query.lat,
        minLat: -5,
        maxLat: 5,
      })
      .andWhere('year - :year BETWEEN :minYear AND :maxYear', {
        year: query.year,
        minYear: -3,
        maxYear: 3,
      })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawOne();

    return this.reportRepository
      .createQueryBuilder('report')
      .select('AVG(report.price)', 'price')
      .where('report.make = :make', { make: query.make })
      .andWhere('report.model = :model', { model: query.model })
      .andWhere('report.year BETWEEN :minYear AND :maxYear', {
        minYear: query.year - 3,
        maxYear: query.year + 3,
      })
      .andWhere('report.lng BETWEEN :minLng AND :maxLng', {
        minLng: query.lng - 5,
        maxLng: query.lng + 5,
      })
      .andWhere('report.lat BETWEEN :minLat AND :maxLat', {
        minLat: query.lat - 5,
        maxLat: query.lat + 5,
      })
      .orderBy('ABS(report.mileage - :mileage)', 'DESC')
      .setParameters({ mileage: query.mileage })
      .getRawOne();
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.reportRepository.findOne({
      where: { id: Number(id) },
      relations: { user: true },
    });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;

    await this.reportRepository.save(report);
    return report;
  }
}
