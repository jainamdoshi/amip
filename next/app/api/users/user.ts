'use server';

import { endpoint } from '../common';

export async function generateUserId() {
    const result = await fetch(`${endpoint}/catalog/generate-user-id`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!result.ok) {
        throw new Error('Failed to generate user ID');
    }

    const data = await result.json();
    return data.user_id;
}
