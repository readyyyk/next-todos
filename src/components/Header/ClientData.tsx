'use client';

import {FC} from 'react';
import ClientImage from '@/components/ClientImage';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import {AvatarIcon} from '@radix-ui/react-icons';

interface Props {}

const ClientData:FC<Props> = ({}) => {
    const {data: session} = useSession();
    return session ?
        <Link href={'/profile'} className={'flex rounded-full px-3 py-2 text-lg text-accent transition-colors hover:bg-slate-600'}>
            <div className={'flex items-center space-x-3'}>
                <h3 className={'w-fit'}>{session.user.username}</h3>
                <ClientImage
                    className={'h-full w-fit'}
                    src={session.user.image}
                    alt={'userLogo'}
                    width={15}
                    height={15}
                />
            </div>
        </Link>:
        <Link href={'/api/auth/signin'} className={'flex rounded-full px-3 py-2 text-lg text-accent transition-colors hover:bg-slate-600'}>
            <div className={'flex w-fit items-center space-x-3'}>
                <h3 className={'w-fit'}>Sign in</h3>
                <AvatarIcon className={'h-full w-fit'}/>
            </div>
        </Link>;
};

export default ClientData;
