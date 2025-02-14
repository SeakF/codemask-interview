import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CountryData, CountryDataId, PartialCountryData, PartialCountryDataId } from './medals.interface';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class MedalsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly countries: CountriesService
    ) {}

    create(data: CountryData[]) {
        return this.prisma.db.countries.createMany({
            data: data.map(({ country, gold_medals, silver_medals, bronze_medals }: CountryData) => ({
                country: country,
                gold_medals: gold_medals,
                silver_medals: silver_medals,
                bronze_medals: bronze_medals,
                medals_total: gold_medals + silver_medals + bronze_medals
            }))
        });
    }

    createOne(data: CountryData) {
        const { country, gold_medals, silver_medals, bronze_medals } = data;

        return this.prisma.db.countries.create({
            data: {
                country: country,
                gold_medals: gold_medals,
                silver_medals: silver_medals,
                bronze_medals: bronze_medals,
                medals_total: gold_medals + silver_medals + bronze_medals
            },
            include: {
                code: true
            }
        });
    }

    async read(
        page: number | string,
        limit: number | string,
        sortOrder?: 'asc' | 'desc',
        sortBy?: string,
    ) {
        const parsedPage = typeof page === 'string' ? parseInt(page) : page;
        const parsedLimit = typeof limit === 'string' ? parseInt(limit) : limit;

        const orderBy: { [key: string]: 'asc' | 'desc' } = {};

        if (sortBy && ['medals_total', 'gold_medals', 'silver_medals', 'bronze_medals'].includes(sortBy)) {
            orderBy[sortBy] = sortOrder || 'desc';
        } else {
            orderBy['country'] = sortOrder || 'asc';
        }

        const [data, total] = await this.prisma.db.$transaction([
            this.prisma.db.countries.findMany({
                skip: (parsedPage - 1) * parsedLimit,
                take: parsedLimit,
                include: {
                    code: true
                },
                orderBy: orderBy
            }),
            this.prisma.db.countries.count()
        ]);

        return { data: data.map((country) => ({
            ...country,
            flag_url: this.countries.provideFlagUrl(country.country)
        })), total };
    }

    async readOneById(id: string) {    
        const result = await this.prisma.db.countries.findUnique({
            where: {
                id: id
            },
            include: {
                code: true
            }
        });

        return {
            ...result,
            flag_url: this.countries.provideFlagUrl(result.country)
        }
    }
    
    async readOneByCountry(country: string) {
        const result = await this.prisma.db.countries.findUnique({
            where: {
                country: country
            },
            include: {
                code: true
            }
        });

        return {
            ...result,
            flag_url: this.countries.provideFlagUrl(result.country)
        }
    }

    updateById(data: PartialCountryDataId[]) {
        return this.prisma.db.$transaction(async (tx) => {
            const results = await tx.countries.findMany({
                where: {
                    id: {
                        in: data.map(({ id }) => id)
                    }
                }
            });
            
            const updatedResults: CountryDataId[] = []
            for (const element of data) {
                const foundCountryInResults = results.find(result => result.id === element.id);

                for (const field in element) {
                    foundCountryInResults[field] = element[field];
                }

                updatedResults.push(foundCountryInResults);
            }

            return await Promise.all(
                updatedResults.map(async (updatedResult) => {
                    const { id, country, gold_medals, silver_medals, bronze_medals } = updatedResult;

                    return await tx.countries.update({
                        where: {
                            id: id
                        },
                        data: {
                            country: country,
                            gold_medals: gold_medals,
                            silver_medals: silver_medals,
                            bronze_medals: bronze_medals,
                            medals_total: gold_medals + silver_medals + bronze_medals
                        },
                        include: {
                            code: true
                        }
                    })
                }
            ));
        });
    }

    updateOneById(data: PartialCountryDataId) {
        return this.prisma.db.$transaction(async (tx) => {
            const result = await tx.countries.findUnique({
                where: {
                    id: data.id
                }
            });

            for (const field in data) {
                result[field] = data[field];
            }

            const { id, country, gold_medals, silver_medals, bronze_medals } = result;

            return await tx.countries.update({
                where: {
                    id: id
                },
                data: {
                    country: country,
                    gold_medals: gold_medals,
                    silver_medals: silver_medals,
                    bronze_medals: bronze_medals,
                    medals_total: gold_medals + silver_medals + bronze_medals
                },
                include: {
                    code: true
                }
            })
        });
    }

    updateByCountry(data: PartialCountryData[]) {
        return this.prisma.db.$transaction(async (tx) => {
            const results = await tx.countries.findMany({
                where: {
                    country: {
                        in: data.map(({ country }) => country)
                    }
                }
            });

            const updatedResults: CountryDataId[] = []
            for (const element of data) {
                const foundCountryInResults = results.find(result => result.country === element.country);

                for (const field in element) {
                    foundCountryInResults[field] = element[field];
                }

                updatedResults.push(foundCountryInResults);
            }

            return await Promise.all(
                updatedResults.map(async (updatedResult) => {
                    const { country, gold_medals, silver_medals, bronze_medals } = updatedResult;

                    return await tx.countries.update({
                        where: {
                            country: country
                        },
                        data: {
                            gold_medals: gold_medals,
                            silver_medals: silver_medals,
                            bronze_medals: bronze_medals,
                            medals_total: gold_medals + silver_medals + bronze_medals
                        },
                        include: {
                            code: true
                        }
                    })
                }
            ));
        });
    }

    updateOneByCountry(data: PartialCountryData) {
        return this.prisma.db.$transaction(async (tx) => {
            const result = await tx.countries.findUnique({
                where: {
                    country: data.country
                }
            });

            for (const field in data) {
                result[field] = data[field];
            }

            const { country, gold_medals, silver_medals, bronze_medals } = result;

            return await tx.countries.update({
                where: {
                    country: country
                },
                data: {
                    gold_medals: gold_medals,
                    silver_medals: silver_medals,
                    bronze_medals: bronze_medals,
                    medals_total: gold_medals + silver_medals + bronze_medals
                },
                include: {
                    code: true
                }
            })
        });
    }

    deleteById(ids: string[]) {
        return this.prisma.db.countries.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
    }

    deleteOneById(id: string) {
        return this.prisma.db.countries.delete({
            where: {
                id: id
            }
        });
    }

    deleteByCountry(countries: string[]) {
        return this.prisma.db.countries.deleteMany({
            where: {
                country: {
                    in: countries
                }
            }
        });
    }

    deleteOneByCountry(country: string) {
        return this.prisma.db.countries.delete({
            where: {
                country: country
            }
        });
    }
}
