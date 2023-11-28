import React, {FC} from 'react';
import {PlusCircledIcon} from '@radix-ui/react-icons';
import Link from 'next/link';

interface Props {}

const NewTask:FC<Props> = ({}) => {
    return (<Link href={`/?create=true`} className='cursor-pointer rounded-xl bg-green-600 p-4 text-secondary opacity-90 shadow-lg shadow-zinc-400 transition-all hover:opacity-100 hover:shadow-slate-300'>
        <h2 className={'flex items-center space-x-1 text-xl capitalize'}>
            <PlusCircledIcon className={'h-6 w-6'}/> <span> Crete new task! </span>
        </h2>
    </Link>);
};

export default NewTask;
