'use client';

import React, {FC} from 'react';
import ClientImage from '@/components/ClientImage';
import backendAPI from '@/backendAPI';
import {useQuery} from '@tanstack/react-query';
import {Skeleton} from '@/components/ui/skeleton';
import {createAuthedAxiosInst} from '@/backendAxios';
import {Session} from 'next-auth';


interface Props {
    session: Session,
}

const ClientData:FC<Props> = ({session}) => {
    const instance = createAuthedAxiosInst(session.user);
    const {queryFn, queryKey} = backendAPI.getMe(null, instance);
    const query = useQuery({
        queryFn,
        queryKey: queryKey,
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
        console.error(response.error);
        return <h2 className={'text-center text-3xl text-red-900 text-opacity-75'}> Failed to validate data... </h2>;
    }

    const user = response.data;

    return (<>
        <div className={'aspect-square w-16 rounded-full p-2 shadow-md'}>
            <ClientImage
                className={'w-full'}
                src={user.image}
                alt={'User avatar'}
                width={24}
                height={24}
                loading="lazy"
            />
        </div>
        <div className={'flex flex-col justify-center'}>
            <h2 className={'text-xl font-bold'}>{user.firstname} {user.lastname}</h2>
            <h2 className={'text-xl font-light'}>{user.username}</h2>
        </div>
    </>);
};

export default ClientData;
