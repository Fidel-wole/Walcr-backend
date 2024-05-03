/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../config/env';
@Module({
  imports:[ PassportModule.register({ defaultStrategy: 'jwt' }),
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: '2h' },
  }),],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
