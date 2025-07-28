export const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export type ApiResponse<T> = {
    success: boolean;
    results: T;
};
