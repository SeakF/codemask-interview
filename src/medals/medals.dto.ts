import { IsNotEmpty, IsNumber, IsString, IsIn, IsOptional } from 'class-validator';
import { CountryData, CountryDataId } from './medals.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountriesDto extends Array<CreateOneDto> {}

export class CreateOneDto implements CountryData {
    @ApiProperty({ description: 'ISO 3166-1 alpha-2 code of the country' })
    @IsString()
    @IsNotEmpty()
    country: string;

    @ApiProperty({ description: 'Number of gold medals' })
    @IsNumber()
    @IsNotEmpty()
    gold_medals: number;

    @ApiProperty({ description: 'Number of silver medals' })
    @IsNumber()
    @IsNotEmpty()
    silver_medals: number;

    @ApiProperty({ description: 'Number of bronze medals' })
    @IsNumber()
    @IsNotEmpty()
    bronze_medals: number;
}

export class GetMedalsDto {
    @ApiProperty({ description: 'Page number for retrieving country medals', default: 1, required: true})
    page: number = 1;

    @ApiProperty({ description: 'Limit of country medals returned per page', default: 10, required: true})
    limit: number = 10;
    
    @ApiProperty({ description: 'Field to sort by', enum: ['medals_total', 'gold_medals', 'silver_medals', 'bronze_medals', 'country'], required: false})
    @IsOptional()
    @IsString()
    @IsIn(['medals_total', 'gold_medals', 'silver_medals', 'bronze_medals', 'country'])
    sortBy?: string;

    @ApiProperty({ description: 'Sort order', enum: ['asc', 'desc'], required: false})
    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc';
}

export class UpdateByIdsDto extends Array<UpdateOneByIdDto> {}

export class UpdateOneByIdDto implements Partial<CountryDataId> {
    @ApiProperty({ description: 'Id of the country' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'ISO 3166-1 alpha-2 code of the country' })
    @IsString()
    @IsOptional()
    country?: string;

    @ApiProperty({ description: 'Number of gold medals' })
    @IsNumber()
    @IsOptional()
    gold_medals?: number;

    @ApiProperty({ description: 'Number of silver medals' })
    @IsNumber()
    @IsOptional()
    silver_medals?: number;

    @ApiProperty({ description: 'Number of bronze medals' })
    @IsNumber()
    @IsOptional()
    bronze_medals?: number;
}

export class UpdateByCountriesDto extends Array<UpdateOneByCountryDto> {}

export class UpdateOneByCountryDto implements Partial<CountryData> {
    @ApiProperty({ description: 'ISO 3166-1 alpha-2 code of the country' })
    @IsString()
    @IsNotEmpty()
    country: string;

    @ApiProperty({ description: 'Number of gold medals' })
    @IsNumber()
    @IsOptional()
    gold_medals?: number;

    @ApiProperty({ description: 'Number of silver medals' })
    @IsNumber()
    @IsOptional()
    silver_medals?: number;

    @ApiProperty({ description: 'Number of bronze medals' })
    @IsNumber()
    @IsOptional()
    bronze_medals?: number;
}

export class DeleteByIdsDto extends Array<DeleteOneByIdDto> {}

export class DeleteOneByIdDto {
    @ApiProperty({ description: 'Id of the country' })
    @IsString()
    @IsNotEmpty()
    id: string;
}

export class DeleteByCountriesDto extends Array<DeleteOneByCountryDto> {}

export class DeleteOneByCountryDto {
    @ApiProperty({ description: 'ISO 3166-1 alpha-2 code of the country' })
    @IsString()
    @IsNotEmpty()
    country: string;
}