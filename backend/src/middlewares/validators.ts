import { celebrate, Joi, Segments } from 'celebrate';
import { IImage, IProduct } from '../models/product';

enum PaymentMethod {
  Card = 'card',
  Online = 'online'
}

export interface IOrder {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

const orderSchema = Joi.object<IOrder>({
    payment: Joi.string().valid(...Object.values(PaymentMethod)).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    total: Joi.number().positive().required(),
    items: Joi.array()
        .items(Joi.string().required())
        .min(1)
        .required()
});

export const imageSchema = Joi.object<IImage>({
  fileName: Joi.string().required(),
  originalName: Joi.string().required()
});

export const productSchema = Joi.object<IProduct>({
  title: Joi.string().min(2).max(30).required(),
  image: imageSchema.required(),
  category: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().allow(null).optional()
});

export const productValidator = celebrate({[Segments.BODY]: productSchema})
export const orderValidator = celebrate({[Segments.BODY]: orderSchema});
