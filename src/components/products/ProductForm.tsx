import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'next-i18next';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { productFormSchema } from '@/utils/validationSchemas';
import { Product } from '@/types';
import { X } from 'lucide-react';

interface ProductFormProps {
    product?: Product;
    onSubmit: (values: any) => Promise<void>;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
    const { t } = useTranslation('common');
    const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');

    const initialValues = {
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        category: product?.category || '',
        stock: product?.stock || 0,
        imageUrl: product?.imageUrl || '',
        imagePublicId: product?.imagePublicId || '',
    };

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    {product ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                </button>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={productFormSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, errors, touched, setFieldValue }) => (
                    <Form className="space-y-4">
                        <Field name="name">
                            {({ field }: any) => (
                                <Input
                                    {...field}
                                    label="Nombre del Producto"
                                    placeholder="Ej: Laptop Pro 15"
                                    error={touched.name && errors.name ? String(errors.name) : undefined}
                                    fullWidth
                                />
                            )}
                        </Field>

                        <Field name="description">
                            {({ field }: any) => (
                                <Textarea
                                    {...field}
                                    label="Descripción"
                                    placeholder="Describe el producto..."
                                    error={touched.description && errors.description ? String(errors.description) : undefined}
                                    rows={4}
                                    fullWidth
                                />
                            )}
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field name="price">
                                {({ field }: any) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        step="0.01"
                                        label="Precio ($)"
                                        placeholder="99.99"
                                        error={touched.price && errors.price ? String(errors.price) : undefined}
                                        fullWidth
                                    />
                                )}
                            </Field>

                            <Field name="stock">
                                {({ field }: any) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        label="Stock"
                                        placeholder="10"
                                        error={touched.stock && errors.stock ? String(errors.stock) : undefined}
                                        fullWidth
                                    />
                                )}
                            </Field>
                        </div>

                        <Field name="category">
                            {({ field }: any) => (
                                <Input
                                    {...field}
                                    label="Categoría"
                                    placeholder="Ej: Electrónica"
                                    error={touched.category && errors.category ? String(errors.category) : undefined}
                                    fullWidth
                                />
                            )}
                        </Field>

                        <Field name="imageUrl">
                            {({ field }: any) => (
                                <div>
                                    <Input
                                        {...field}
                                        label="URL de la Imagen"
                                        placeholder="https://..."
                                        error={touched.imageUrl && errors.imageUrl ? String(errors.imageUrl) : undefined}
                                        fullWidth
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setImageUrl(e.target.value);
                                        }}
                                    />
                                    {imageUrl && (
                                        <div className="mt-2">
                                            <img
                                                src={imageUrl}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-lg"
                                                onError={() => setImageUrl('')}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </Field>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                variant="primary"
                                isLoading={isSubmitting}
                                disabled={isSubmitting}
                                fullWidth
                            >
                                {product ? 'Actualizar' : 'Crear'} Producto
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Card>
    );
};

export default ProductForm;
