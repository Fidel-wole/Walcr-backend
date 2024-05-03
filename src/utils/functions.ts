/* eslint-disable prettier/prettier */
import appConfig from "src/config/app";
import bcrypt from 'bcrypt'
export async function hashPassword(password: string):Promise<string>{
    return await bcrypt.hash(password, appConfig.constants.SALT_ROUNDS);
  }

export async function comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }