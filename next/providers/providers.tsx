import ReactQueryProvider from './react-query-provider';
import { UserProvider } from './userProvider';

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <UserProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
        </UserProvider>
    );
}
