'use client';

import React, {FC} from 'react';
import TaskList from '@/app/TaskList';
import NotLogged from '@/components/NotLogged';
import {useSession} from 'next-auth/react';


const Home:FC = () => {
    const {data: session} = useSession();

    return session ?
        <div className={'container m-auto px-2 py-12'}>
            <h1 className={'text-center text-4xl'}>Task list:</h1>
            <TaskList user={session.user}/>
        </div> :
        <NotLogged />;
};

export default Home;
