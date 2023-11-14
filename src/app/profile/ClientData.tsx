import React, {FC} from 'react';
import ClientImage from '@/components/ClientImage';
import {getServerSession} from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';
import {redirect} from 'next/navigation';
import backendAPI from '@/backendAPI';

interface Props {}

const ClientData:FC<Props> = async ({}) => {
    const session = await getServerSession(options);
    if (!session) {
        redirect('/api/auth/signin');
    }

    const response = await backendAPI.getUser(session.user.id);
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
