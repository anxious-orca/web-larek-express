import { Request, Response } from 'express';
import Product from '../models/product';

export const getProducts = (req: Request, res: Response) => {
    return Product.find({})
    .then((products) => res.status(200).send({ data: products }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

export const createProduct = (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400).send({error: "Content is required"});
        return
    }
    const { title, image, category, description, price } = req.body;
    return Product.create({ title, image, category, description, price })
        .then((product) => res.status(200).send({ data: product }))
        .catch((err) => {
            if (err.code === 11000) {
                return res.status(400).send({ message: 'Такой товар уже существует' });
            }
            res.status(500).send({ message: err.message });
        });

}