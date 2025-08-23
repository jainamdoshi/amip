'use server';

import { cookies } from 'next/headers';
import { endpoint } from '../common';

export async function generateUserId() {
  return 'adf6a0be-6755-4636-9040-e1d2bf11ccba';
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
  return 'adf6a0be-6755-4636-9040-e1d2bf11ccba'
    const cookieStore = await cookies();
    if (!cookieStore.has('userId')) {
        cookieStore.set('userId', await generateUserId(), {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
    }

    return cookieStore.get('userId')?.value || null;
}
