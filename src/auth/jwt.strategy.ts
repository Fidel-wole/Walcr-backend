/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./schema/user.schema";
import { JWT_SECRET } from "src/config/env";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:JWT_SECRET
        })
    }
    async validate(payload){
        const {id} =payload;
        const user = await this.userModel.findById(id);
        if(!user){
            throw new UnauthorizedException('Login first to access this endpoint')
        }
        return user
    }
}