import { cookies } from 'next/headers';
import { generateUserId } from './user';

export async function GET() {
    const cookieStore = await cookies();
    if (!cookieStore.has('user_id')) {
        cookieStore.set('user_id', await generateUserId());
    }

    return Response.json({ user_id: cookieStore.get('user_id')?.value || null });
}

export async function getUserId() {
    const cookieStore = await cookies();
    if (!cookieStore.has('user_id')) {
        cookieStore.set('user_id', await generateUserId(), {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
    }

    return cookieStore.get('user_id')?.value || null;
}
