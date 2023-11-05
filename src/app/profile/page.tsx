'use client';

import React, {FC, useEffect, useState} from 'react';
import CenterLayout from '@/components/CenterLayout';
import ClientImage from '@/components/ClientImage';
import {redirect} from 'next/navigation';
import User, {UserScheme} from '@/types/user';
import Link from 'next/link';

import {z} from 'zod';


interface Props {}

const Page:FC<Props> = ({}) => {
    if (typeof window === 'undefined' || !('localStorage' in window) || !('_token' in localStorage)) {
        redirect('/login');
    }

    const token = z.string().safeParse(localStorage['_token']);
    console.log(token);
    const [user, setUser] = useState<User|undefined>(undefined);

    useEffect(() => {
        void (async ()=> {
            const parsed = UserScheme.safeParse(
                await fetch(`https://dummyjson.com/todos/user/5`,
                    {headers: {}})
                    .then((res) => res.json()),
            );
            if (!parsed.success) {
                console.log(parsed.error.message);
                return;
            }
            setUser(parsed.data);
        })();
    }, []);

    return (
        <CenterLayout>
            { user ?
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
                        <h2 className={'text-xl font-bold'}>{user.firstName} {user.lastName}</h2>
                        <h2 className={'text-xl font-light'}>{user.username}</h2>
                    </div>
                </div> :
                <div className={'flex h-screen flex-col items-center justify-center'}>
                    <h1 className={'text-4xl text-red-700'}> Error parsing user data </h1>
                    <Link href={'/'} className={'mt-4 rounded-xl bg-blue-600 px-6 py-2 text-3xl text-white'}>Home</Link>
                </div>
            }
        </CenterLayout>
    );
};

export default Page;
