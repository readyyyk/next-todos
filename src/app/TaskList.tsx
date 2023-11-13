import React from 'react';
import Task from '@/app/Task';
import backendAPI from '@/backendAPI';
import {getServerSession} from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';
import {redirect} from 'next/navigation';


const TaskList = async () => {
    const session = await getServerSession(options);
    if (!session) {
        redirect('/api/auth/signin');
    }

    const response = await backendAPI.getTodos(session.user.id);
    if (!response.success) {
        console.log(response.error.message);
        return <h2 className={'text-center text-3xl text-red-900 text-opacity-75'}> Failed to validate data... </h2>;
    }

    const todos = response.data;
    return (
        <div className={'mt-10 flex w-full flex-col flex-wrap justify-center gap-6 px-2 md:grid md:grid-cols-3'}>
            {todos.map((el) => {
                return <Task {...el} key={el.id}/>;
            })}
        </div>
    );
};

export default TaskList;
