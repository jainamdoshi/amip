'use client';

import Cookies from 'js-cookie';
import { createContext, ReactNode, useContext } from 'react';

const UserContext = createContext<string | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const userId = Cookies.get('user_id') || '';
    return <UserContext.Provider value={userId}>{children}</UserContext.Provider>;
};

export const useUserId = (): string => {
    const context = useContext(UserContext);
    return context || '';
};
