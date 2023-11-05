import React, {FC} from 'react';
import Link from 'next/link';
import {TaskScheme} from '@/types/task';
import {UserScheme} from '@/types/user';
import ClientImage from '@/components/ClientImage';
import {Button} from '@/components/ui/button';

import ActionsBar from './ActionsBar';
import CenterLayout from '@/components/CenterLayout';


interface Params {
    params: { todoId: number }
}

const Page:FC<Params> = async ({params: {todoId}}) => {
    if (!todoId) {
        return ( <div className={'flex h-screen flex-col items-center justify-center'}>
            <h1 className={'text-4xl text-red-700'}> Invalid task ID </h1>
            <Link href={'/'} className={'mt-4 rounded-xl bg-blue-600 px-6 py-2 text-3xl text-white'}>Home</Link>
        </div>);
    }

    const task = TaskScheme.safeParse(
        await fetch(`https://dummyjson.com/todos/${todoId}`)
            .then((res)=>res.json()),
    );

    if (!task.success) {
        console.log(task.error.message);
        return ( <div className={'flex h-screen flex-col items-center justify-center'}>
            <h1 className={'text-4xl text-red-700'}> Error parsing task data </h1>
            <Link href={'/'} className={'mt-4 rounded-xl bg-blue-600 px-6 py-2 text-3xl text-white'}>Home</Link>
        </div>);
    }

    const user = UserScheme.safeParse(
        await fetch(`https://dummyjson.com/users/${task.data.userId}`)
            .then((res)=>res.json()),
    );

    if (!user.success) {
        console.log(user.error.message);
        return ( <div className={'flex h-screen flex-col items-center justify-center'}>
            <h1 className={'text-4xl text-red-700'}> Error parsing user data </h1>
            <Link href={'/'} className={'mt-4 rounded-xl bg-blue-600 px-6 py-2 text-3xl text-white'}>Home</Link>
        </div>);
    }

    return (
        <CenterLayout>
            <div className={'flex flex-1 items-center gap-4'}>
                <ClientImage
                    className={'aspect-square w-16 rounded-full shadow-md'}
                    src={user.data.image}
                    alt={'User avatar'}
                    width={24}
                    height={24}
                    loading='lazy'
                    fetchPriority='low'
                />
                <div className={'flex flex-col justify-center'}>
                    <h2 className={'text-xl font-bold'}>{user.data.firstName} {user.data.lastName}</h2>
                    <h2 className={'text-xl font-light'}>{user.data.username}</h2>
                </div>
            </div>
            <h1 className={'text-lg'}>{task.data.todo}</h1>
            <div className={'grid grid-cols-2 gap-2'}>
                <ActionsBar isDone={task.data.completed} className={'col-span-2 text-lg'}/>
                <Button className={'bg-red-500 text-lg'}> Delete </Button>
                <Button className={'bg-green-500 text-lg'}> Save </Button>
            </div>
        </CenterLayout>
    );
};

export default Page;
