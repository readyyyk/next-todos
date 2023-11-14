import {FC} from 'react';
import Link from 'next/link';
import {AvatarIcon, HomeIcon} from '@radix-ui/react-icons';
import UserData from './Header/UserData';
import {getServerSession} from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';

interface Props {}

const Header:FC<Props> = async ({}) => {
    const session = await getServerSession(options);
    return (
        <div className={'sticky top-2 z-30 m-auto flex h-14 w-[80dvw] max-w-xl items-stretch justify-between space-x-2 rounded-full bg-zinc-800 p-2 shadow-lg'}>
            <div className={'flex items-center'}>
                <Link href={'/'} className={'flex h-full items-center space-x-3 rounded-full px-3 py-2 text-lg text-accent transition-colors hover:bg-slate-600'}>
                    <h3>Home</h3>
                    <HomeIcon className={'h-full w-fit'}/>
                </Link>
            </div>
            <div className={'flex rounded-full px-3 py-2 text-lg text-accent transition-colors hover:bg-slate-600'}>
                {session ?
                    <UserData userId={session.user.id}/> :
                    <Link href={'/api/auth/signin'} className={'flex w-fit items-center space-x-3'}>
                        <h3 className={'w-fit'}>Log in</h3>
                        <AvatarIcon className={'h-full w-fit'}/>
                    </Link>}
            </div>
        </div>
    );
};

export default Header;
