import * as Joi from 'joi';

class CreateTransactionDTO {
  amount: number;
  description?: string;
  occurredAt?: string;
}

export const createTransactionSchema = Joi.object<CreateTransactionDTO>({
  amount: Joi.number().positive().precision(2).required(),
  description: Joi.string().max(300).optional(),
  occurredAt: Joi.date().iso().optional(),
}).unknown(false);

export default CreateTransactionDTO;
