import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { Order } from '../middlewares/validations';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            return next(new BadRequestError('Контент не предоставлен'));
        }

        const order: Order = req.body;
        const products = await Product.find({
            _id: { $in: order.items },
            price: { $exists: true, $ne: null }
        });

        if (products.length !== order.items.length) {
            return next(new BadRequestError('Некоторые товары не существуют или их нельзя купить'));
        }

        const calculatedTotal = products.reduce(
            (sum, p) => sum + p.price!,
            0
        );

        if (calculatedTotal !== order.total) {
            return next(new BadRequestError('Неверная сумма заказа'));
        }

        res.status(200).send({ id: faker.string.uuid(), total: calculatedTotal });
    } catch (error) {
        next(error);
    }
};