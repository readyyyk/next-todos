import React from 'react';
import TaskI, {TaskResScheme} from '@/types/task';
import Task from '@/app/Task';

const TaskList = async () => {
    const response = TaskResScheme.safeParse(await fetch('https://dummyjson.com/todos/user/2').then((res)=>res.json()));
    if (!response.success) {
        console.log(response.error.message);
        return <h2 className={'text-center text-3xl text-red-900 text-opacity-75'}> Failed to validate data... </h2>;
    }

    const todos:Array<TaskI> = response.data.todos;
    return (
        <div className={'mt-10 flex w-full flex-col flex-wrap justify-center gap-6 px-2 md:grid md:grid-cols-3'}>
            {todos.map((el) => {
                return <Task {...el} key={el.id}/>;
            })}
        </div>
    );
};

export default TaskList;
