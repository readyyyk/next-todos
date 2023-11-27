import React, {FC} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import CenterLayout from '@/components/CenterLayout';

interface Props {}

const NotLogged:FC<Props> = ({}) => {
    return (<CenterLayout>
        <h1 className={'text-center text-4xl'}>You&apos;re not logged</h1>
        <div className={'flex justify-center space-x-2'}>
            <Link href={'/auth/signin'} className={'justify-self-center'}>
                <Button variant={'info'} className={'text-xl'}>Sign in</Button>
            </Link>
            <Link href={'/auth/signup'} className={'justify-self-center'}>
                <Button variant={'success'} className={'text-xl'}>Sign up</Button>
            </Link>
        </div>
    </CenterLayout>);
};

export default NotLogged;
