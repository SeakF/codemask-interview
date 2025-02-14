import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MedalsModule } from './medals/medals.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [PrismaModule, MedalsModule, CountriesModule]
})
export class AppModule {}
