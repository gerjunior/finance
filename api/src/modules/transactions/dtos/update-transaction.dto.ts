import * as Joi from 'joi';

class UpdateTransactionDTO {
  amount?: number;
  description?: string;
  occurredAt?: string;
}

export const updateTransactionSchema = Joi.object<UpdateTransactionDTO>({
  amount: Joi.number().positive().precision(2).optional(),
  description: Joi.string().max(300).optional(),
  occurredAt: Joi.date().iso().optional(),
}).unknown(false);

export default UpdateTransactionDTO;
