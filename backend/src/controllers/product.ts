import { Request, Response } from 'express';
import Product from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
    return await Product.find({})
    .then((products) => res.status(200).send({ items: products, total: products.length }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

export const createProduct = async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400).send({message: "Контент не предоставлен"});
        return
    }
    const { title, image, category, description, price } = req.body;
    return await Product.create({ title, image, category, description, price })
        .then((product) => res.status(200).send({ data: product }))
        .catch((err) => {
            if (err.code === 11000) {
                return res.status(409).send({ message: 'Такой товар уже существует' });
            }
            res.status(500).send({ message: err.message });
        });

}