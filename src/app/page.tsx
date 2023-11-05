import {FC} from 'react';
import TaskList from '@/app/TaskList';


const Home:FC = () => {
    return (
        <div className={'container m-auto px-2 py-12'}>
            <h1 className={'text-center text-4xl'}>Task list:</h1>
            <TaskList />
        </div>
    );
};

export default Home;
