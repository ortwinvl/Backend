import { IsOptional, IsString, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export interface IMember {
    id: number;
    organisation: string,
    firstname: string;
    name: string;
    image: string;
    password: string;
    birthday: Date;
    membersince: Date;
    streetandnr: string;
    zipcode: string;
    city: string;
    mobile: string;
    email: string;
    isadmin: number;
    active: number;
    classification_id: number;
    mfa: string;
    mfadate: Date;
    resetlink: string;
    resetlinktimestamp: Date;
    licensenumber: string;
    emergencycontact: string;
    emergencycontactphone: string;
}

export class CreateMemberDto implements IMember{
    @IsOptional() @IsNumber()
    @Exclude()
    public id: number;

    @IsOptional() @IsString()
    @Exclude()
    public organisation: string;

    @IsOptional() @IsString()
    @Expose()
    public firstname: string;

    @IsNotEmpty() @IsString()
    @Expose()
    public name: string;

    @IsOptional() @IsString()
    @Expose()
    public image: string;

    @IsNotEmpty() @IsString()
    @Expose()
    public password: string;

    @IsOptional() @IsDateString()
    @Expose()
    public birthday: Date;

    @IsOptional() @IsDateString()
    @Expose()
    public membersince: Date;

    @IsOptional() @IsString()
    @Expose()
    public streetandnr: string;

    @IsOptional() @IsString()
    @Expose()
    public city: string;

    @IsOptional() @IsString()
    @Expose()
    public zipcode: string;

    @IsOptional() @IsString()
    @Expose()
    public mobile: string;

    @IsNotEmpty() @IsString()
    @Expose()
    public email: string;

    @IsOptional() @IsNumber()
    @Expose()
    public isadmin: number;

    @IsOptional() @IsNumber()
    @Expose()
    public active: number;

    @IsOptional() @IsNumber()
    @Expose()
    public classification_id: number;

    @IsOptional() @IsString()
    @Exclude()
    public mfa: string;

    @IsOptional() @IsDateString()
    @Exclude()
    public mfadate: Date;

    @IsOptional() @IsString()
    @Exclude()
    public resetlink: string;

    @IsOptional() @IsDateString()
    @Exclude()
    public resetlinktimestamp: Date;

    @IsOptional() @IsString()
    @Expose()
    public licensenumber: string;

    @IsOptional() @IsString()
    @Expose()
    public emergencycontact: string;

    @IsOptional() @IsString()
    @Expose()
    public emergencycontactphone: string;
}

export class UpdateMemberDto implements IMember{
    @IsOptional() @IsNumber()
    @Exclude()
    public id: number;

    @IsOptional() @IsString()
    @Exclude()
    public organisation: string;

    @IsOptional() @IsString()
    @Expose()
    public firstname: string;

    @IsOptional() @IsString()
    @Expose()
    public name: string;

    @IsOptional() @IsString()
    @Expose()
    public image: string;

    @IsOptional() @IsString()
    @Expose()
    public password: string;

    @IsOptional() @IsDateString()
    @Expose()
    public birthday: Date;

    @IsOptional() @IsDateString()
    @Expose()
    public membersince: Date;

    @IsOptional() @IsString()
    @Expose()
    public streetandnr: string;

    @IsOptional() @IsString()
    @Expose()
    public city: string;

    @IsOptional() @IsString()
    @Expose()
    public zipcode: string;

    @IsOptional() @IsString()
    @Expose()
    public mobile: string;

    @IsOptional() @IsString()
    @Expose()
    public email: string;

    @IsOptional() @IsNumber()
    @Expose()
    public isadmin: number;

    @IsOptional() @IsNumber()
    @Expose()
    public active: number;

    @IsOptional() @IsNumber()
    @Expose()
    public classification_id: number;

    @IsOptional() @IsString()
    @Exclude()
    public mfa: string;

    @IsOptional() @IsDateString()
    @Exclude()
    public mfadate: Date;

    @IsOptional() @IsString()
    @Exclude()
    public resetlink: string;

    @IsOptional() @IsDateString()
    @Exclude()
    public resetlinktimestamp: Date;

    @IsOptional() @IsString()
    @Expose()
    public licensenumber: string;

    @IsOptional() @IsString()
    @Expose()
    public emergencycontact: string;

    @IsOptional() @IsString()
    @Expose()
    public emergencycontactphone: string;
}