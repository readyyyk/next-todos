import React, {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import ITask from '@/types/task';
import Link from 'next/link';


interface Params extends ITask {}

const Task:FC<Params> = ({id, state, description}) => {
    return (
        <Link href={`/${id}`} className={twJoin('rounded-xl p-4 w-2xl shadow-lg hover:shadow-slate-300 hover:opacity-100 opacity-90 cursor-pointer transition-all shadow-slate-400', state === 'done' ? 'bg-green-300' : 'bg-blue-300')}>
            <span className={'text-lg capitalize'}>{description}</span>
        </Link>
    );
};

export default Task;
