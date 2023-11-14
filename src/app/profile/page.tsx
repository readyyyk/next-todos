import React, {FC} from 'react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import ClientData from './ClientData';
import NotLogged from '@/components/NotLogged';
import {getServerSession} from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';
import CenterLayout from '@/components/CenterLayout';


interface Props {}

const Page:FC<Props> = async ({}) => {
    const session = await getServerSession(options);

    if (!session) {
        return <NotLogged />;
    }

    return (<CenterLayout>
        <div className={'flex flex-1 items-center gap-4'}>
            <ClientData />
        </div>
        <div className={'grid grid-cols-1 justify-items-center'}>
            <Link href={'/api/auth/signout'}>
                <Button variant={'danger'} className={'w-min'}>Sign out</Button>
            </Link>
        </div>
    </CenterLayout>);
};

export default Page;
