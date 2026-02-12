import { model, Schema } from 'mongoose';

export interface IProduct {
  title: string;
  image: string;
  category: string;
  description?: string;
  price?: number | null;
}

export interface IImage { 
    fileName: string;
    originalName: string;
}

const imageSchema = new Schema<IImage>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  }
});

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
    default: null
  },
});

export default model<IProduct>('product', productSchema);