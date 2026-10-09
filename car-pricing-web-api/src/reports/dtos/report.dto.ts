import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/user.entity.js';

export class ReportDto {
    @Expose()
    id: number;

    @Expose()
    price: number;  

    @Expose()
    year: number;
    
    @Expose()
    make: string;

    @Expose()
    lat: number;

    @Expose()
    model: string;

    @Expose()
    mileage: number;

    @Expose()
    lng: number;

    @Expose()
    approved: boolean;

    @Transform(({ value }) => value.user.id)
    @Expose()
    userId: number;
}