import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto.js';
import { ReportsService } from './reports.service.js';
import { AuthGuard } from '../guard/auth.guard.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import { User } from '../users/user.entity.js';
import { Report } from './report.entity.js';
import { Serialize } from '../interceptors/serialize.interceptop.js';
import { ReportDto } from './dtos/report.dto.js';

@Controller('reports')
export class ReportsController {

    constructor(private readonly reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }
    
    @Get()
    async getAllReports() {
        return await this.reportsService.findAll();
    }

    @Get('/:id')
    async getReportById(@Param('id') id: string) {
        return await this.reportsService.findOne(id);
    }

    @Patch('/:id')
    async updateReport(@Param('id') id: string, @Body() body: CreateReportDto) {
        return await this.reportsService.update(id, body);
    }

    @Delete('/:id')
    async deleteReport(@Param('id') id: string) {
        return await this.reportsService.delete(id);
    }   
}
