import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
export const { ObserveModule, ObserveInstrument } = createObserveModule();
import { User } from './users/user.entity.js';
import { Report } from './reports/report.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [User, Report],
      synchronize: true,
      // host: 'localhost',
      // port: 5432,
      // username: 'your_username',
      // password: 'your_password',
      // database: 'your_database',
    }),
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // ObserveModule.forRoot({
    //   appKey: 'YOUR_APP_KEY',
    //   appSecret: 'YOUR_APP_SECRET',
    //   serviceId: 'car-pricing-web-api',
    // }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
