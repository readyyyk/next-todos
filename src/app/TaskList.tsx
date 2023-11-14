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
        <>
            {todos.map((el) => {
                return <Task {...el} key={el.id}/>;
            })}
        </>
    );
};

export default TaskList;
