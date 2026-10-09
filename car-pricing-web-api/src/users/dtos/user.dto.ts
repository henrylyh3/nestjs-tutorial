import { Expose, Exclude } from 'class-transformer';

export class UserDto {
    @Exclude()
    id: number;

    @Expose()
    email: string;

    @Exclude()
    password: string;
}