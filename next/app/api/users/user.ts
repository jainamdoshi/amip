'use server';

import { cookies } from 'next/headers';
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

export async function getUserId() {
    const cookieStore = await cookies();
    if (!cookieStore.has('userId')) {
        cookieStore.set('userId', await generateUserId(), {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
    }

    return cookieStore.get('userId')?.value || null;
}
