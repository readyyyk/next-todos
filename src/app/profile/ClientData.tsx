'use client';

import React, {FC} from 'react';
import ClientImage from '@/components/ClientImage';
import {redirect} from 'next/navigation';
import backendAPI from '@/backendAPI';
import {useSession} from 'next-auth/react';
import {useQuery} from '@tanstack/react-query';
import {Skeleton} from '@/components/ui/skeleton';

interface Props {}

const ClientData:FC<Props> = ({}) => {
    const {data: session} = useSession();
    if (!session) {
        redirect('/api/auth/signin');
    }

    const {queryFn, queryKey} = backendAPI.getUser(session.user.id);
    const query = useQuery({
        queryFn,
        queryKey: [queryKey],
    });

    if (query.isLoading) {
        return <>
            <Skeleton className="aspect-square h-16 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[130px]" />
                <Skeleton className="h-4 w-[100px]" />
            </div>
        </>;
    }

    if (!query.data) {
        return <h1>Failed to fetch</h1>;
    }

    const response = query.data;

    if (!response.success) {
        console.log(response.error.message);
        return <h2 className={'text-center text-3xl text-red-900 text-opacity-75'}> Failed to validate data... </h2>;
    }

    const user = response.data;

    return (<>
        <ClientImage
            className={'aspect-square w-16 rounded-full shadow-md'}
            src={user.image}
            alt={'User avatar'}
            width={24}
            height={24}
            loading="lazy"
        />
        <div className={'flex flex-col justify-center'}>
            <h2 className={'text-xl font-bold'}>{user.firstname} {user.lastname}</h2>
            <h2 className={'text-xl font-light'}>{user.username}</h2>
        </div>
    </>);
};

export default ClientData;
