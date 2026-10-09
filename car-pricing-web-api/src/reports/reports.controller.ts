import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto.js';
import { ReportsService } from './reports.service.js';
import { AuthGuard } from '../guard/auth.guard.js';


@Controller('reports')
export class ReportsController {

    constructor(private readonly reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    async createReport(@Body() body: CreateReportDto) {
        return await this.reportsService.create(body);
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
