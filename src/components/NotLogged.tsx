import React, {FC} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import CenterLayout from '@/components/CenterLayout';

interface Props {}

const NotLogged:FC<Props> = ({}) => {
    return (<CenterLayout>
        <h1 className={'text-center text-4xl'}>You&apos;re not logged</h1>
        <Link href={'/api/auth/signin'} className={'justify-self-center'}>
            <Button variant={'success'} className={'text-xl'}>Sign in</Button>
        </Link>
    </CenterLayout>);
};

export default NotLogged;
