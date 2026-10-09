import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
// import * as bcrypt from 'bcrypt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    //check email is in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    //hash the users password
    // Generate a salt and hash the password using bcrypt
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //join salt and hash together
    const result = `${salt}.${hash.toString('hex')}`;

    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save it

    // Return the user

    return this.userService.create(email, result);
    // Implement your signup logic here
  }

  async signin(email: string, password: string) {
    // Implement your signin logic here
    // decrpt
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;

    // find user


    //assing cookei
  }
  // This is a placeholder for the authentication service.
  // You can implement your authentication logic here.
}