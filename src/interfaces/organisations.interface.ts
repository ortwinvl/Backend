import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export interface IOrganisation {
  id?: string;
  organisation: string;
  isactive: number;
  vatnumber?: string;
  streetandnr?: string;
  contactperson?: string;
  contactemail?: string;
  contactphone?: string;
  city?: string;
  zipcode?: string;
}

export class CreateUpdateOrganisationDto implements IOrganisation{
  @IsOptional() @IsString()
  public id: string;

  @IsNotEmpty() @IsString()
  @Expose()
  public organisation: string;

  @IsOptional() @IsString()
  @Expose()
  public vatnumber: string;

  @IsOptional() @IsString()
  @Expose()
  public contactperson: string;

  @IsOptional() @IsString()
  @Expose()
  public contactemail: string;

  @IsOptional() @IsString()
  @Expose()
  public contactphone: string;

  @IsOptional() @IsNumber()
  public isactive: number;

  @IsOptional() @IsString()
  @Expose()
  public city: string;

  @IsOptional() @IsString()
  @Expose()
  public zipcode: string;

  @IsOptional() @IsString()
  @Expose()
  public streetandnr: string;
}

export class CreateOrganisationUserDto {
   @IsNotEmpty() @IsString()
  public organisation: string;

  @IsNotEmpty() @IsString()
  public name: string;

  @IsNotEmpty() @IsString()
  public email: string;

  @IsOptional() @IsString()
  public firstname: string;

  @IsNotEmpty() @IsString()
  public password: string;
}

