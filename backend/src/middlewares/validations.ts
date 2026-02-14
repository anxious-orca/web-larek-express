import { celebrate, Joi, Segments } from 'celebrate';

enum PaymentMethod {
  Card = 'card',
  Online = 'online'
}

export interface Order {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

const orderSchema = Joi.object<Order>({
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

export const orderValidator = celebrate({[Segments.BODY]: orderSchema});
