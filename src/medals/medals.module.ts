import { Module } from '@nestjs/common';
import { MedalsController } from './medals.controller';
import { MedalsService } from './medals.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CountriesModule } from '../countries/countries.module';

@Module({
  imports: [PrismaModule, CountriesModule],
  providers: [MedalsService],
  controllers: [MedalsController]
})
export class MedalsModule {}
