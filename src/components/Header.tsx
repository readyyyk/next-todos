import {FC} from 'react';
import Link from 'next/link';
import {HomeIcon} from '@radix-ui/react-icons';
import ClientData from './Header/ClientData';

interface Props {}

const Header:FC<Props> = ({}) => {
    return (
        <div className={'sticky top-2 z-30 m-auto flex h-14 w-[80dvw] max-w-xl items-stretch justify-between space-x-2 rounded-full bg-zinc-800 p-2 shadow-lg'}>
            <div className={'flex items-center'}>
                <Link href={'/'} className={'flex h-full items-center space-x-3 rounded-full px-3 py-2 text-lg text-accent transition-colors hover:bg-slate-600'}>
                    <h3>Home</h3>
                    <HomeIcon className={'h-full w-fit'}/>
                </Link>
            </div>

            <ClientData/>
        </div>
    );
};

export default Header;
