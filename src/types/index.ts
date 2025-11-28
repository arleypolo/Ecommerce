export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imagePublicId: string;
  stock: number;
  createdAt: Date | string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html: string;
}
