'use client';

import React, {FC} from 'react';
import {Button} from '@/components/ui/button';
import ClientData from './ClientData';
import NotLogged from '@/components/NotLogged';
import CenterLayout from '@/components/CenterLayout';
import {signOut, useSession} from 'next-auth/react';


interface Props {}

const Page:FC<Props> = ({}) => {
    const {data: session, status} = useSession();

    if (status==='unauthenticated' || !session) {
        return <NotLogged />;
    }

    return (<CenterLayout>
        <div className={'flex flex-1 items-center gap-4'}>
            <ClientData session={session}/>
        </div>
        <div className={'grid grid-cols-1 justify-items-center'}>
            <Button
                variant={'danger'}
                className={'w-min'}
                onClick={()=>void signOut()}
            >
                Sign out
            </Button>
        </div>
    </CenterLayout>);
};

export default Page;
