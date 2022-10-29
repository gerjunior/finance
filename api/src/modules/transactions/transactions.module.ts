import { Module } from '@nestjs/common';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import TransactionsRepository from './infra/prisma/repositories/transactions.repository';
import { PrismaService } from '@/shared/modules/prisma.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    PrismaService,
    {
      provide: 'TransactionsRepository',
      useClass: TransactionsRepository,
    },
  ],
})
export class TransactionsModule {}
