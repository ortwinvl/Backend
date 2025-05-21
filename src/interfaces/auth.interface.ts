import { IsOptional, IsString, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { Request } from 'express';
import fileUpload from 'express-fileupload';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  accessToken: string;
  expiresAt: Date;
  mfatoken?: string;
}

export interface RequestWithUser extends Request {
  body: any;
  params: any;
  userid: number;
  organisationid: string;
  language: number;
  isadmin?: number,
  isbackoffice?: number,
  files?: fileUpload.FileArray | null | undefined;
}

export interface ILogin {
  email: string;
  password: string;
}

export class LoginDto implements ILogin{
    @IsNotEmpty() @IsString()
    @Expose()
    public password: string;

    @IsNotEmpty() @IsString()
    @Expose()
    public email: string;
}