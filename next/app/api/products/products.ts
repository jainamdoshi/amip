import { ApiResponse, Product, RawProduct } from './types';

export type Pagination = {
    pageIndex: number;
    pageSize: number;
};
const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export async function fetchProducts(productName: string, product_number: string, pagination: Pagination) {
    const res = await fetch(`${endpoint}/catalog/search?page=${pagination.pageIndex}&page_size=${pagination.pageSize}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: '123',
            catalog_name: 'JINKU_CATALOG',
            product_name: productName,
            product_number: product_number,
        }),
    });
    const data = (await res.json()) as ApiResponse;
    return {
        ...data,
        results: {
            ...data.results,
            products: parseProducts(data.results.products),
        },
    };
}

function parseProducts(data: RawProduct[]): Product[] {
    return data.map((product) => ({
        id: product._id,
        name: product.product_name,
        image: product.product_image,
        specifications: {
            location: product.specifications.Location,
            position: product.specifications.Position,
        },
        number: product.Number,
        owner: product.Owner,
    }));
}

export async function fetchProductTypes() {
    const res = await fetch(`${endpoint}/catalog/types`, {
        method: 'POST',
        body: JSON.stringify({
            user_id: '123',
            catalog_name: 'JINKU_CATALOG',
        }),
    });
    if (!res.ok) {
        throw new Error('Failed to fetch product types');
    }
    return res.json();
}
