'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState, ReactNode, FC} from 'react';


const TSQueryProvider:FC<{children: ReactNode}> = ({children}) => {
    const [queryClient] = useState(() => new QueryClient());

    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>;
};

export default TSQueryProvider;
