import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UsePipes } from '@nestjs/common';

import JoiValidationPipe, { useSchema } from '@/shared/pipes/joi.validation.pipe';
import { TransactionsService } from './transactions.service';
import CreateTransactionDTO, { createTransactionSchema } from './dtos/create-transaction.dto';
import UpdateTransactionDTO, { updateTransactionSchema } from './dtos/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getAll() {
    return this.transactionsService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.transactionsService.get(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createTransactionSchema))
  create(@Body() createDTO: CreateTransactionDTO) {
    return this.transactionsService.create(createDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(useSchema(updateTransactionSchema)) data: UpdateTransactionDTO) {
    return this.transactionsService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.transactionsService.delete(id);
  }
}
