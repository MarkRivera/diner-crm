import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  tender: any[]; // TODO: Create Tender Class

  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: string;
}
