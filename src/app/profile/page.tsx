import React, {FC} from 'react';
import CenterLayout from '@/components/CenterLayout';
import ClientImage from '@/components/ClientImage';
import {redirect} from 'next/navigation';

import {getServerSession} from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';
import backendAPI from '@/backendAPI';
import {Button} from '@/components/ui/button';
import Link from 'next/link';


interface Props {}

const Page:FC<Props> = async ({}) => {
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

    return (
        <CenterLayout>
            <div className={'flex flex-1 items-center gap-4'}>
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
            </div>
            <div className={'grid grid-cols-1 justify-items-center'}>
                <Link href={'/api/auth/signout'}>
                    <Button variant={'danger'} className={'w-min'}>Sign out</Button>
                </Link>
            </div>
        </CenterLayout>
    );
};

export default Page;
