import ReactQueryProvider from './react-query-provider';

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
