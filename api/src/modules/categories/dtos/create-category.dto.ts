import * as Joi from 'joi';

class CreateCategoryDTO {
  name: string;
}

export const createCategorySchema = Joi.object<CreateCategoryDTO>({
  name: Joi.string().min(1).max(30).required(),
}).unknown(false);

export default CreateCategoryDTO;
