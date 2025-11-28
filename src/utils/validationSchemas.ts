import * as yup from 'yup';

export const contactFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('validation.required')
    .min(2, 'validation.minLength')
    .max(100, 'validation.maxLength'),
  email: yup
    .string()
    .required('validation.required')
    .email('validation.emailInvalid'),
  subject: yup
    .string()
    .required('validation.required')
    .min(5, 'validation.minLength')
    .max(200, 'validation.maxLength'),
  message: yup
    .string()
    .required('validation.required')
    .min(10, 'validation.minLength')
    .max(1000, 'validation.maxLength'),
});

export const productFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('validation.required')
    .min(3, 'validation.minLength')
    .max(100, 'validation.maxLength'),
  description: yup
    .string()
    .required('validation.required')
    .min(10, 'validation.minLength')
    .max(500, 'validation.maxLength'),
  price: yup
    .number()
    .required('validation.required')
    .positive('El precio debe ser positivo')
    .min(0.01, 'El precio debe ser mayor a 0'),
  category: yup
    .string()
    .required('validation.required'),
  stock: yup
    .number()
    .required('validation.required')
    .integer('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
});
