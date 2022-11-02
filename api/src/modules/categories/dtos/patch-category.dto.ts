import * as Joi from 'joi';

class PatchCategoryDTO {
  name: string;
}

export const patchCategorySchema = Joi.object<PatchCategoryDTO>({
  name: Joi.string().min(1).max(30).optional(),
}).unknown(false);

export default PatchCategoryDTO;
