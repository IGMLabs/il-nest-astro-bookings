import {IsNotEmptyObject, IsNumber, IsString} from 'class-validator';

export class ClientDto {
    @IsNotEmptyObject()
    @IsString()
    name: string;
    @IsNumber()
    edad?: number;
}