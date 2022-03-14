import { prisma } from 'database';
import { Request, Response } from 'express';
import * as yup from 'yup';

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
	const bodySchema = yup.object().shape({
		name: yup.string().strict().required(),
		description: yup.string().strict().required(),
		amount: yup.number().strict().required(),
	}).noUnknown();

	const { body } = req

	await bodySchema.validate(body);

  const response = await prisma.category.create({
    data: body,
  });

  return res.status(201).json(response);
};
