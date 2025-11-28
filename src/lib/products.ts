// Mock database - en producción usa una base de datos real
let products = [
    {
        id: '1',
        name: 'Laptop Pro 15"',
        description: 'Potente laptop para profesionales con procesador de última generación',
        price: 1299.99,
        category: 'Electrónica',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        imagePublicId: 'sample',
        stock: 15,
        createdAt: new Date(),
    },
    {
        id: '2',
        name: 'Auriculares Bluetooth',
        description: 'Auriculares inalámbricos con cancelación de ruido',
        price: 199.99,
        category: 'Electrónica',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        imagePublicId: 'sample',
        stock: 30,
        createdAt: new Date(),
    },
    {
        id: '3',
        name: 'Smartwatch Pro',
        description: 'Reloj inteligente con monitor de salud y GPS',
        price: 349.99,
        category: 'Electrónica',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        imagePublicId: 'sample',
        stock: 20,
        createdAt: new Date(),
    },
    {
        id: '4',
        name: 'Cámara DSLR',
        description: 'Cámara profesional de 24MP con lente incluido',
        price: 899.99,
        category: 'Fotografía',
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
        imagePublicId: 'sample',
        stock: 8,
        createdAt: new Date(),
    },
    {
        id: '5',
        name: 'Tablet 10"',
        description: 'Tablet ligera y potente para trabajo y entretenimiento',
        price: 449.99,
        category: 'Electrónica',
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        imagePublicId: 'sample',
        stock: 25,
        createdAt: new Date(),
    },
    {
        id: '6',
        name: 'Teclado Mecánico',
        description: 'Teclado gaming con retroiluminación RGB',
        price: 129.99,
        category: 'Accesorios',
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        imagePublicId: 'sample',
        stock: 40,
        createdAt: new Date(),
    },
];

export const getAllProducts = () => products;

export const getProductById = (id: string) =>
    products.find(p => p.id === id);

export const createProduct = (productData: any) => {
    const newProduct = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date(),
    };
    products.push(newProduct);
    return newProduct;
};

export const updateProduct = (id: string, productData: any) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        return products[index];
    }
    return null;
};

export const deleteProduct = (id: string) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        return true;
    }
    return false;
};
