import { IsOptional, IsString, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export interface IRide {
    id: number;
    organisation: string,
    destination: string;
    leader: number;
    starttime: Date;
    duration: number;
    classification: number;
    officialride: number;
    elevation: number;
    distance: number;
    linkfield: string;
    ispublic: number;
}

export class CreateRideDto implements IRide{
    @IsOptional() @IsNumber()
    @Exclude()
    public id: number;

    @IsOptional() @IsString()
    @Expose()
    public organisation: string;

    @IsNotEmpty() @IsString()
    @Expose()
    public destination: string;

    @IsOptional() @IsNumber()
    @Expose()
    public leader: number;

    @IsOptional() @IsNumber()
    @Expose()
    public classification: number;

    @IsNotEmpty() @IsDateString()
    @Expose()
    public starttime: Date;

    @IsNotEmpty() @IsNumber()
    @Expose()
    public duration: number;

    @IsOptional() @IsNumber()
    @Expose()
    public officialride: number;

    @IsOptional() @IsNumber()
    @Expose()
    public elevation: number;

    @IsOptional() @IsNumber()
    @Expose()
    public distance: number;

    @IsOptional() @IsString()
    @Expose()
    public linkfield: string;

    @IsOptional() @IsNumber()
    @Expose()
    public ispublic: number;
}

export class UpdateRideDto implements IRide{
    @IsOptional() @IsNumber()
    @Exclude()
    public id: number;

    @IsOptional() @IsString()
    @Exclude()
    public organisation: string;

    @IsOptional() @IsString()
    @Expose()
    public destination: string;

    @IsOptional() @IsNumber()
    @Expose()
    public leader: number;

    @IsOptional() @IsNumber()
    @Expose()
    public classification: number;

    @IsOptional() @IsDateString()
    @Expose()
    public starttime: Date;

    @IsOptional() @IsNumber()
    @Expose()
    public duration: number;

    @IsOptional() @IsNumber()
    @Expose()
    public officialride: number;

    @IsOptional() @IsNumber()
    @Expose()
    public elevation: number;

    @IsOptional() @IsNumber()
    @Expose()
    public distance: number;

    @IsOptional() @IsString()
    @Expose()
    public linkfield: string;

    @IsOptional() @IsNumber()
    @Expose()
    public ispublic: number;
}