/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import appConfig from "src/config/app";
import * as bcrypt from 'bcrypt';
import * as request from 'request';
export async function hashPassword(password: string):Promise<string>{
    return await bcrypt.hash(password, appConfig.constants.SALT_ROUNDS);
  }

export async function comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
  
  export async function sendOTp(phone_number:number){
  const data = {
                 "api_key" : "Your API key",
                 "message_type" : "NUMERIC",
                 "to" : phone_number,
                 "from" : "TLwEnRho8z70m1G3AIFUUbUmWHFSZTQfM9GihtZ4y1JYEHWYTFJaTo9TPiFUmf",
                 "channel" : "dnd",
                 "pin_attempts" : 10,
                 "pin_time_to_live" :  5,
                 "pin_length" : 6,
                 "pin_placeholder" : "< 1234 >",
                 "message_text" : "Your pin is < 1234 >",
                 "pin_type" : "NUMERIC"
              };
  const options = {
    'method': 'POST',
    'url': 'https://api.ng.termii.com/api/sms/otp/send',
    'headers': {
      'Content-Type': ['application/json', 'application/json']
    },
    body: JSON.stringify(data)
  
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body, error);
  });

  }