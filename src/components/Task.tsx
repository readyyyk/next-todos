import React, {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import ITask, {TaskState} from '@/types/task';
import Link from 'next/link';


interface Params extends ITask {}

const variants = {
    [TaskState.DONE]: 'bg-green-300 dark:bg-green-800',
    [TaskState.ACTIVE]: 'bg-blue-300 dark:bg-blue-800',
    [TaskState.PASSIVE]: 'bg-gray-300 dark:bg-gray-800',
    [TaskState.IMPORTANT]: 'bg-yellow-300 dark:bg-yellow-800',
};

const Task:FC<Params> = ({id, state, description}) => {
    return (
        <Link href={`/${id}`} className={twJoin(
            'rounded-xl p-4 w-2xl shadow-lg hover:shadow-slate-300 hover:opacity-100 opacity-90 cursor-pointer transition-all shadow-zinc-400',
            variants[state],
        )}>
            <span className={'text-lg capitalize'}>{description}</span>
        </Link>
    );
};

export default Task;
