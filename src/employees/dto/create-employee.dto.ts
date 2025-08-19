import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsInt, ValidateNested, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @ApiProperty() @IsString() street: string;
  @ApiProperty() @IsString() area: string;
  @ApiProperty() @IsString() region: string;
  @ApiProperty() @IsString() city: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() postalCode?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() description?: string;
}

export class CreateEmployeeDto {
  @ApiProperty() @IsString() firstName: string;
  @ApiProperty() @IsString() lastName: string;
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty() @IsString() mobileNumber: string;
  @ApiProperty() @IsDecimal() monthlySalary: number;
  @ApiProperty({ required: false }) @IsOptional() @IsString() pictureUrl?: string;

  @ApiProperty({ description: 'Position ID (ID in database)' })
  @IsInt() positionId: number;

  @ApiProperty({ type: AddressDto })
  @ValidateNested() @Type(() => AddressDto) address: AddressDto;
}
