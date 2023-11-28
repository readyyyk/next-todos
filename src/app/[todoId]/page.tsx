import React, {FC, Suspense} from 'react';
import Link from 'next/link';
import CenterLayout from '@/components/CenterLayout';
import TaskData from './TaskData';
import * as Skeletons from './Skeletons';


interface Params {
    params: { todoId: number }
}

const Page:FC<Params> = ({params: {todoId}}) => {
    if (!todoId) {
        return ( <div className={'flex h-screen flex-col items-center justify-center'}>
            <h1 className={'text-4xl text-red-700'}> Invalid task ID </h1>
            <Link href={'/'} className={'mt-4 rounded-xl bg-blue-600 px-6 py-2 text-3xl text-white'}>Home</Link>
        </div>);
    }

    return (
        <CenterLayout>
            <Suspense fallback={<>
                <Skeletons.User />
                <Skeletons.Interactive />
            </>}>
                <TaskData todoId={todoId}/>
            </Suspense>
        </CenterLayout>
    );
};

export default Page;
