/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../config/env';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports:[forwardRef(()=>WalletModule), PassportModule.register({ defaultStrategy: 'jwt' }),
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: '2h' },
  }),],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
