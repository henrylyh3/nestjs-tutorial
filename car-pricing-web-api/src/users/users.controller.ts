import { Controller, Body, Post, Get, Param, Patch, Query, Delete, NotFoundException, ClassSerializerInterceptor, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import { Serialize, SerializeInterceptor } from '../interceptors/serialize.interceptop.js';
import { UserDto } from './dtos/user.dto.js';
import { AuthService } from './auth.service.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import { User } from './user.entity.js';
import { AuthGuard } from '../guard/auth.guard.js';

@Controller('auth')
@Serialize(UserDto)
export class UsersController
{
    constructor(private usersService: UsersService, private authService: AuthService) {}

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        console.log(body);
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: any) {
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Get('/:id')
    async findUserById(@Param('id') id: string) {

        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get()
    findAllUser(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }
}
