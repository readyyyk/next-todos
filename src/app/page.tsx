import React, {FC} from 'react';
import TaskList from '@/app/TaskList';
import NotLogged from '@/components/NotLogged';
import {getServerSession} from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';


const Home:FC = async () => {
    const session = await getServerSession(options);
    return session ?
        <div className={'container m-auto px-2 py-12'}>
            <h1 className={'text-center text-4xl'}>Task list:</h1>
            <TaskList user={session.user}/>
        </div> :
        <NotLogged />;
};

export default Home;
