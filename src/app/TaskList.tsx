'use client';

import React, {FC} from 'react';
import Task from '@/app/Task';
import backendAPI from '@/backendAPI';
import {useQuery} from '@tanstack/react-query';
import {Skeleton} from '@/components/ui/skeleton';


interface Props {
    userId: number,
}

const TaskList:FC<Props> = ({userId}) => {
    const {queryFn, queryKey} = backendAPI.getTodos(userId);
    const query = useQuery({
        queryKey: [queryKey],
        queryFn,
    });

    let taskList = <h2 key='Error'>Failed to fetch</h2>;
    if (query.data && query.data.success) {
        taskList = (<>
            {query.data.data.map((el) => {
                return <Task {...el} key={'task-' + el.id}/>;
            })}
        </>);
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
