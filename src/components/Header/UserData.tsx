import {FC} from 'react';
import Link from 'next/link';
import {AvatarIcon} from '@radix-ui/react-icons';
import ClientImage from '@/components/ClientImage';
import {getServerSession} from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';

interface Props {}

const Header:FC<Props> = async ({}) => {
    const session = await getServerSession(options);

    return !session ?
        <Link href={'/api/auth/signin'} className={'flex w-fit items-center space-x-3'}>
            <h3 className={'w-fit'}>Log in</h3>
            <AvatarIcon className={'h-full w-fit'}/>
        </Link> :
        <Link href={'/profile'} className={'flex items-center space-x-3'}>
            <h3 className={'w-fit'}>{session.user.username}</h3>
            <ClientImage
                className={'h-full w-fit'}
                src={session.user.image}
                alt={'userLogo'}
                width={15}
                height={15}
            />
        </Link>;
};

export default Header;
