import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto.js';
import { ReportsService } from './reports.service.js';
import { AuthGuard } from '../guard/auth.guard.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import { User } from '../users/user.entity.js';
import { Report } from './report.entity.js';
import { Serialize } from '../interceptors/serialize.interceptop.js';
import { ReportDto } from './dtos/report.dto.js';
import { ApproveReportDto } from './dtos/approve-report.dto.js';
import { AdminGuard } from '../guard/admin.guard.js';
import { GetEstimateDto } from './dtos/get-estimate.dto.js';

@Controller('reports')
export class ReportsController {

    constructor(private readonly reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }
    
    @Patch('/:id/approve')
    @Serialize(ReportDto)
        @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.changeApproval(id, body.approved);
    } 

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        console.log(query);
        return this.reportsService.getEstimate(query);
    }
}
