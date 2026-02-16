import { model, Schema } from 'mongoose';

export interface IImage {
    fileName: string;
    originalName: string;
}

export interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description?: string;
  price?: number | null;
}

const imageSchema = new Schema<IImage>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
}, { versionKey: false });

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
  },
  image: imageSchema,
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: null,
  },
}, { versionKey: false });

export default model<IProduct>('product', productSchema);
