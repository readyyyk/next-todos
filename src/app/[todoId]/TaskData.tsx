import React, {FC} from 'react';
import backendAPI from '@/backendAPI';
import ClientImage from '@/components/ClientImage';
import ActionsBar from '@/app/[todoId]/ActionsBar';
import {Button} from '@/components/ui/button';

interface Props {
    todoId: number
}

const TaskData:FC<Props> = async ({todoId}) => {
    const {queryFn} = backendAPI.getTodoWithOwner(todoId);
    const response = await queryFn();
    if (!response.success) {
        console.log(response.error.message);
        return <h2 className={'text-center text-3xl text-red-900 text-opacity-75'}> Failed to validate data... </h2>;
    }
    return (<>
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
    </>);
};

export default TaskData;
