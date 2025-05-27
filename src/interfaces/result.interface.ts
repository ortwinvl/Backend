import { IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export interface IResult {
    id: number;
    rideId: number;
    memberId: number;
}

export class CreateResultDto implements IResult{
    @IsOptional() @IsNumber()
    @Exclude()
    public id: number;

    @IsNotEmpty() @IsNumber()
    @Expose()
    public rideId: number;

    @IsNotEmpty() @IsNumber()
    @Expose()
    public memberId: number;  
}