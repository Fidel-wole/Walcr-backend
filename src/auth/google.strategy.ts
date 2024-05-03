/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { AUTH_CLIENT_ID } from 'src/config/env';
import { AUTH_CLIENT_SECRET } from 'src/config/env';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService, private jwtService: JwtService,) {
    super({
      clientID: AUTH_CLIENT_ID,
      clientSecret:AUTH_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const userData = {
      email: emails[0].value,
      name:`${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      isEmailVerfied: true,
    };
    const user = await this.authService.findUser(userData.email);
    if(user){
        const token = this.jwtService.sign({ id: user._id });
        profile.token = token;
        return done(null, profile);
    }else{
        await this.authService.registerUser(userData)
        return done(null, profile);
    }

  }
}
