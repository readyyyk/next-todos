'use client';

import React, {FC} from 'react';
import Task from '@/components/Task';
import backendAPI from '@/backendAPI';
import {useQuery} from '@tanstack/react-query';
import {Skeleton} from '@/components/ui/skeleton';
import {User} from 'next-auth';
import {createAuthedAxiosInst} from '@/backendAxios';


interface Props {
    user: User,
}

const TaskList:FC<Props> = ({user}) => {
    const instance = createAuthedAxiosInst(user);

    const {queryFn, queryKey} = backendAPI.getTodos(user.id, instance);
    const query = useQuery({
        queryKey: [queryKey],
        queryFn,
    });

    let taskList = <h2>Failed to fetch</h2>;
    if (query.data && query.data.success) {
        taskList = <h2 className={'grid-cols-12 text-2xl font-bold'}>You have no todos.<br />Go and create one!</h2>;
        if (query.data.data.length) {
            taskList = (<>
                {query.data.data.map((el) => {
                    return <Task {...el} key={'task-' + el.id}/>;
                })}
            </>);
        }
    }

    return <div className={'mt-10 flex w-full flex-col flex-wrap justify-center gap-6 px-2 md:grid md:grid-cols-3'}>
        {
            query.isLoading ? <>
                <Skeleton className={'h-40'}/>
                <Skeleton className={'h-52'}/>
                <Skeleton className={'h-44'}/>
            </> : taskList
        }
    </div>;
};

export default TaskList;
