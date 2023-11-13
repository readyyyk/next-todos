import React, {FC} from 'react';
import Link from 'next/link';
import ClientImage from '@/components/ClientImage';
import {Button} from '@/components/ui/button';

import ActionsBar from './ActionsBar';
import CenterLayout from '@/components/CenterLayout';
import backendAPI from '@/backendAPI';


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

    const response = await backendAPI.getTodoWithOwner(todoId);
    if (!response.success) {
        console.log(response.error.message);
        return <h2 className={'text-center text-3xl text-red-900 text-opacity-75'}> Failed to validate data... </h2>;
    }
    return (
        <CenterLayout>
            <div className={'flex flex-1 items-center gap-4'}>
                <ClientImage
                    className={'aspect-square w-16 rounded-full shadow-md'}
                    src={response.data.owner.image}
                    alt={'User avatar'}
                    width={24}
                    height={24}
                    loading='lazy'
                    fetchPriority='low'
                />
                <div className={'flex flex-col justify-center'}>
                    <h2 className={'text-xl font-bold'}>{response.data.owner.firstname} {response.data.owner.lastname}</h2>
                    <h2 className={'text-xl font-light'}>{response.data.owner.username}</h2>
                </div>
            </div>
            <h1 className={'text-lg'}>{response.data.description}</h1>
            <div className={'grid grid-cols-2 gap-2'}>
                <ActionsBar isDone={response.data.state==='done'} className={'col-span-2 text-lg'}/>
                <Button className={'bg-red-500 text-lg'}> Delete </Button>
                <Button className={'bg-green-500 text-lg'}> Save </Button>
            </div>
        </CenterLayout>
    );
};

export default Page;
