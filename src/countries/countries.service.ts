import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CountriesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService
    ) {}

    private apiUrl = this.configService.get<string>('FLAGS_API_URL');

    read() {
        return this.prisma.db.codes.findMany();
    }

    provideFlagUrl(country: string) {
        return `${this.apiUrl}/${country}/flat/64.png`;
    }
}
