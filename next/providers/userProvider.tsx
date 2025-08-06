'use client';

import { getUserId } from '@/app/api/users/user';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
const UserContext = createContext<string | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUserId = async () => {
            const res = await getUserId();
            if (res) {
                setUserId(res);
            }
        };

        if (!userId) {
            fetchUserId();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <UserContext.Provider value={userId}>{children}</UserContext.Provider>;
};

export const useUserId = (): string => {
    const context = useContext(UserContext);
    return context || '';
};
