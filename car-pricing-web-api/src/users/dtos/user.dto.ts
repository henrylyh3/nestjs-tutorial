import { Expose, Exclude } from 'class-transformer';
import e from 'express';

export class UserDto {
    @Exclude()
    id: number;

    @Expose()
    email: string;

    @Exclude()
    password: string;

    @Expose()
    admin: boolean;
}