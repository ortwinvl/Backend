import { IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export interface IResult {
    id: number;
    ride_id: number;
    member_id: number;
}

export class CreateResultDto implements IResult{
    @IsOptional() @IsNumber()
    @Exclude()
    public id: number;

    @IsNotEmpty() @IsNumber()
    @Expose()
    public ride_id: number;

    @IsNotEmpty() @IsNumber()
    @Expose()
    public member_id: number;  
}