import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import Joi from 'joi';

@Injectable()
class JoiValidationPipe implements PipeTransform {
  schema: Joi.ObjectSchema<any>;

  constructor(schema: Joi.ObjectSchema<any>) {
    this.schema = schema;
  }

  transform(value: any) {
    const result = this.schema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    return value;
  }
}

export function useSchema(schema: Joi.ObjectSchema<any>): JoiValidationPipe {
  return new JoiValidationPipe(schema);
}

export default JoiValidationPipe;
