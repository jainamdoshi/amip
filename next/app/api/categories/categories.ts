import { ApiResponse, endpoint } from '../common';
import { RawAllCategoriesResult } from './types';

export function fetchCategories(userId: string) {
    return fetch(`${endpoint}/catalog/categories`, {
        method: 'POST',
        body: JSON.stringify({
            user_id: userId,
            catalog_name: 'JINKU_CATALOG',
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch categories');
            }
            return res.json();
        })
        .then((data) => data as ApiResponse<RawAllCategoriesResult>);
}
