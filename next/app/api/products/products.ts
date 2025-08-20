import { ApiResponse, endpoint } from '../common';
import { Product, RawAllProductNamesResult, RawCrossSearchResult, RawProduct, RawProductResult } from './types';

export type Pagination = {
    pageIndex: number;
    pageSize: number;
};

export type ProductSearchRequest = {
    user_id: string;
    catalog_name: string;
    product_name?: string;
    product_number?: string;
    brand_name?: string;
};

export async function fetchProducts(
    productName: string,
    { productNumber, productBrand }: { productNumber: string; productBrand: string },
    pagination: Pagination,
    userId: string
) {
    const body: ProductSearchRequest = {
        user_id: userId,
        catalog_name: 'JINKU_CATALOG',
    };

    if (productName) {
        body['product_name'] = productName;
    }

    if (productNumber) {
        body['product_number'] = productNumber;
    }

    if (productBrand) {
        body['brand_name'] = productBrand;
    }
    const res = await fetch(`${endpoint}/catalog/search?page=${pagination.pageIndex + 1}&page_size=${pagination.pageSize}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (res.status === 429) {
        throw new Error('Too many requests, please try again later.');
    }

    const data = (await res.json()) as ApiResponse<RawProductResult>;
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
        specifications: product.specifications,
        number: product.Number,
        brand: product.Owner,
        price: product.price || '-',
    }));
}

export async function fetchProductTypes(userId: string) {
    const res = await fetch(`${endpoint}/catalog/products`, {
        method: 'POST',
        body: JSON.stringify({
            user_id: userId,
            catalog_name: 'JINKU_CATALOG',
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch product types');
    }
    const data = (await res.json()) as ApiResponse<RawAllProductNamesResult>;

    return data.results.products;
}

export async function fetchProductDetails(productId: string, userId: string) {
    const res = await fetch(`${endpoint}/catalog/cross-search`, {
        method: 'POST',
        body: JSON.stringify({
            user_id: userId,
            catalog_name: 'JINKU_CATALOG',
            product_mid: productId,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch product details');
    }
    const data = (await res.json()) as RawCrossSearchResult;
    return data.results;
}
