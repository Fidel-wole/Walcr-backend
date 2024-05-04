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
      callbackURL: 'https://walcr-backend.onrender.com/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const userData = {
      email: emails[0].value,
      name:`${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      isEmailConfirmed: true,
    };
    const user = await this.authService.findUser(userData.email);
    if(user){
        const token = this.jwtService.sign({ id: user._id, email:user.email });
        profile.token = token;
        return done(null, profile);
    }else{
       const newUser = await this.authService.registerUser(userData);
        const token = this.jwtService.sign({ id: newUser._id, email: newUser.email });
        profile.token = token;
        return done(null, profile);
    }

  }
}
