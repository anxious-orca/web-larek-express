import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { Order } from '../middlewares/validations';
import Product from '../models/product';

export const createOrder = async (req: Request, res: Response) => {
    const order: Order = req.body;
    const products = await Product.find({
        _id: { $in: order.items },
        price: { $exists: true, $ne: null }
    });

    if (products.length !== order.items.length) {
        return res.status(400).send({
            message: "Некоторые товары не существуют или их нельзя купить"
        });
    }

    const calculatedTotal = products.reduce(
        (sum, p) => sum + p.price!,
        0
    );

    if (calculatedTotal !== order.total) {
        return res.status(400).send({
            message: "Неверная сумма заказа"
        });
    }

    res.status(200).send({ id: faker.string.uuid(), total: calculatedTotal });
}