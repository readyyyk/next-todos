import React, {FC, Suspense} from 'react';
import Link from 'next/link';
import CenterLayout from '@/components/CenterLayout';
import TaskData from './TaskData';
import {Button} from '@/components/ui/button';
import {Skeleton} from '@/components/ui/skeleton';


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
                <div className={'flex flex-1 items-center gap-4'}>
                    <Skeleton className={'aspect-square w-16 rounded-full shadow-md'}/>
                    <div className={'flex flex-col justify-center space-y-2'}>
                        <Skeleton className={'h-6 w-32 text-xl font-bold'}> </Skeleton>
                        <Skeleton className={'h-6 w-16 text-xl font-bold'}> </Skeleton>
                    </div>
                </div>
                <Skeleton className={'h-32 text-lg'} />
                <div className={'grid grid-cols-2 gap-2'}>
                    <Skeleton className={'col-span-2 grid'}> <Button variant={'ghost'} className={'text-lg'}/> </Skeleton>
                    <Skeleton className={'grid'}> <Button variant={'ghost'} className={'text-lg'}/> </Skeleton>
                    <Skeleton className={'grid'}> <Button variant={'ghost'} className={'text-lg'}/> </Skeleton>
                </div>
            </>}>
                <TaskData todoId={todoId}/>
            </Suspense>
        </CenterLayout>
    );
};

export default Page;
