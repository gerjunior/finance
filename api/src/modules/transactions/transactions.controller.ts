import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import JoiValidationPipe from '@/shared/pipes/joi.validation.pipe';
import { TransactionsService } from './transactions.service';
import CreateTransactionDTO, {
  createTransactionSchema,
} from './dtos/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createTransactionSchema))
  create(@Body() createDTO: CreateTransactionDTO) {
    return this.transactionsService.create(createDTO);
  }
}
