import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';

import JoiValidationPipe from '@/shared/pipes/joi.validation.pipe';
import { TransactionsService } from './transactions.service';
import CreateTransactionDTO, {
  createTransactionSchema,
} from './dtos/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getAll() {
    return this.transactionsService.getAll();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createTransactionSchema))
  create(@Body() createDTO: CreateTransactionDTO) {
    return this.transactionsService.create(createDTO);
  }
}
