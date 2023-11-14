'use client';

import {ReactQueryStreamedHydration} from '@tanstack/react-query-next-experimental';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {useState, ReactNode, FC} from 'react';


const TSQueryProvider:FC<{children: ReactNode}> = ({children}) => {
    const [queryClient] = useState(() => new QueryClient());

    return <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
            {children}
        </ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={!!process.env.TQUERY_DEVTOOLS} />
    </QueryClientProvider>;
};

export default TSQueryProvider;
