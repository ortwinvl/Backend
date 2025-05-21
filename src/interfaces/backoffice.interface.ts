import { IsString, IsOptional, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export interface IEnum {
  id?: number;
  organisation?: string;
  enum: string;
  value: string;
  fixed?: number;
  pseudodeleted?: number;
}

export interface ISetting {
  id?: number;
  organisation?: string;
  settinggroup: string;
  settingname: string;
  settingvalue?: string;
}

export class CreateEnumDto implements IEnum{
  @IsOptional() @IsString()
  @Exclude()
  public organisation: string;

  @IsNotEmpty() @IsString()
  @Expose()
  public enum: string;

  @IsNotEmpty() @IsString()
  @Expose()
  public value: string;

  @IsOptional() @IsNumber()
  @Expose()
  public pseudodeleted: number;

  @IsOptional() @IsNumber()
  @Exclude()
  public fixed: number;
}

export class UpdateEnumDto implements IEnum{
  @IsOptional() @IsNumber()
  @Exclude()
  public id: number;

  @IsOptional() @IsString()
  @Exclude()
  public organisation: string;

  @IsOptional() @IsString()
  @Exclude()
  public enum: string;

  @IsOptional() @IsString()
  @Expose()
  public value: string;

  @IsOptional() @IsNumber()
  @Exclude()
  public fixed: number;

  @IsOptional() @IsNumber()
  @Expose()
  public pseudodeleted: number;
}

export class CreateUpdateSettingDto implements ISetting{
  @IsOptional() @IsNumber()
  @Expose()
  public id: number;

  @IsOptional() @IsString()
  @Expose()
  public organisation: string;

  @IsNotEmpty() @IsString()
  @Expose()
  public settinggroup: string;

  @IsNotEmpty() @IsString()
  @Expose()
  public settingname: string;

  @IsOptional() @IsString()
  @Expose()
  public settingvalue: string;
}