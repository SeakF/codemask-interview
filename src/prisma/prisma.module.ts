import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Logger } from '@nestjs/common';

@Module({
  providers: [PrismaService, Logger],
  exports: [PrismaService]
})
export class PrismaModule {}
