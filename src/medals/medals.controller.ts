import { Body, Controller, Delete, Get, HttpException, HttpStatus, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { MedalsService } from './medals.service';
import { MedalsValidationPipe } from './medals.pipe';
import { 
	CreateCountriesDto, 
	CreateOneDto,
	UpdateByIdsDto,
	UpdateOneByIdDto,
	UpdateByCountriesDto,
	UpdateOneByCountryDto,
	DeleteByIdsDto,
	DeleteOneByIdDto,
	DeleteByCountriesDto,
	DeleteOneByCountryDto,
    GetMedalsDto
} from './medals.dto';
import { Prisma } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';

@Controller('medals') 
export class MedalsController {
    constructor(private readonly medals: MedalsService) {}

    @Post('create')
    @ApiBody({ type: [CreateOneDto] })
    async create(@Body(new MedalsValidationPipe()) createCountriesDto: CreateCountriesDto) {
        try {
            return await this.medals.create(createCountriesDto);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException('Country with that name already exists', HttpStatus.CONFLICT);
                } else {
                    throw new HttpException('Database error creating country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error creating country:", e);
                throw new HttpException('Unable to create country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Post('createOne')
    async createOne(@Body(new MedalsValidationPipe()) createOneDto: CreateOneDto) {
        try {
            return await this.medals.createOne(createOneDto);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException('Country with that name already exists', HttpStatus.CONFLICT);
                } else {
                    throw new HttpException('Database error creating country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error creating country:", e);
                throw new HttpException('Unable to create country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Get('get')
    async get(
        @Query(new ValidationPipe()) queryParams: GetMedalsDto
    ) {
        try {
            const { page, limit, sortOrder, sortBy } = queryParams;
            return await this.medals.read(page, limit, sortOrder, sortBy);
        } catch (e) {
            console.error('Error in get:', e);
            throw new HttpException('Failed to retrieve data', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('getOneById')
    async getOneById(
        @Query('id') id: string
    ) {
        try {
            return await this.medals.readOneById(id);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new HttpException('Country with that ID does not exist', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Database error retrieving country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error retrieving country:", e);
                throw new HttpException('Unable to retrieve country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Get('getOneByCountry')
    async getOneByCountry(
        @Query('country') country: string
    ) {
        try {
            return await this.medals.readOneByCountry(country.toUpperCase());
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new HttpException('Country with that name does not exist', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Database error retrieving country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error retrieving country:", e);
                throw new HttpException('Unable to retrieve country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Patch('updateByIds')
    @ApiBody({ type: [UpdateOneByIdDto] })
    async updateByIds(@Body(new MedalsValidationPipe()) updateByIdsDto: UpdateByIdsDto) {
        try {
            return await this.medals.updateById(updateByIdsDto);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new HttpException('Country with that ID does not exist', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Database error updating country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error updating country:", e);
                throw new HttpException('Unable to update country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Patch('updateOneById')
    async updateOneById(@Body(new MedalsValidationPipe()) updateOneByIdDto: UpdateOneByIdDto) {
        try {
            return await this.medals.updateOneById(updateOneByIdDto);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new HttpException('Country with that ID does not exist', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Database error updating country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error updating country:", e);
                throw new HttpException('Unable to update country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Patch('updateByCountries')
    @ApiBody({ type: [UpdateOneByCountryDto] })
    async updateByCountries(@Body(new MedalsValidationPipe()) updateByCountriesDto: UpdateByCountriesDto) {
        try {
            return await this.medals.updateByCountry(updateByCountriesDto);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new HttpException('Country with that name does not exist', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Database error updating country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error updating country:", e);
                throw new HttpException('Unable to update country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Patch('updateOneByCountry')
    async updateOneByCountry(@Body(new MedalsValidationPipe()) updateOneByCountryDto: UpdateOneByCountryDto) {
        try {
            return await this.medals.updateOneByCountry(updateOneByCountryDto);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new HttpException('Country with that name does not exist', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Database error updating country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error updating country:", e);
                throw new HttpException('Unable to update country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Delete('deleteByIds')
    @ApiBody({ type: [DeleteOneByIdDto] })
    async deleteByIds(@Body(new MedalsValidationPipe()) deleteByIdsDto: DeleteByIdsDto) {
        try {
            return await this.medals.deleteById(deleteByIdsDto.map(dto => dto.id));
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new HttpException('Country with that ID does not exist', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Database error deleting country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error deleting country:", e);
                throw new HttpException('Unable to delete country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Delete('deleteOneById')
    async deleteOneById(@Body(new MedalsValidationPipe()) deleteOneByIdDto: DeleteOneByIdDto) {
        try {
            return await this.medals.deleteOneById(deleteOneByIdDto.id);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new HttpException('Country with that ID does not exist', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Database error deleting country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error deleting country:", e);
                throw new HttpException('Unable to delete country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Delete('deleteByCountries')
    @ApiBody({ type: [DeleteOneByCountryDto] })
    async deleteByCountries(@Body(new MedalsValidationPipe()) deleteByCountriesDto: DeleteByCountriesDto) {
        try {
            return await this.medals.deleteByCountry(deleteByCountriesDto.map(dto => dto.country));
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new HttpException('Country with that name does not exist', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Database error deleting country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error deleting country:", e);
                throw new HttpException('Unable to delete country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Delete('deleteOneByCountry')
    async deleteOneByCountry(@Body(new MedalsValidationPipe()) deleteOneByCountryDto: DeleteOneByCountryDto) {
        try {
            return await this.medals.deleteOneByCountry(deleteOneByCountryDto.country);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    throw new HttpException('Country with that name does not exist', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Database error deleting country', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            } else {
                console.error("Error deleting country:", e);
                throw new HttpException('Unable to delete country', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
