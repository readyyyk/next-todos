'use client';

import {FC} from 'react';
import Link from 'next/link';
import ClientImage from '@/components/ClientImage';
import backendAPI from '@/backendAPI';
import {useQuery} from '@tanstack/react-query';
import {Skeleton} from '@/components/ui/skeleton';

interface Props {userId: number}

const Header:FC<Props> = ({userId}) => {
    const {queryFn, queryKey} = backendAPI.getUser(userId);
    const q = useQuery({
        queryFn,
        queryKey: [queryKey],
    });

    if (q.isLoading) {
        return <div className={'flex items-center space-x-3'}>
            <Skeleton className={'w-12'}/>
            <Skeleton className={'h-full w-fit rounded-full'}/>
        </div>;
    }

    if (!q.data || !q.data.success) {
        return 'Failed to fetch';
    }

    return <Link href={'/profile'} className={'flex items-center space-x-3'}>
        <h3 className={'w-fit'}>{q.data.data.username}</h3>
        <ClientImage
            className={'h-full w-fit'}
            src={q.data.data.image}
            alt={'userLogo'}
            width={15}
            height={15}
        />
    </Link>;
};

export default Header;
