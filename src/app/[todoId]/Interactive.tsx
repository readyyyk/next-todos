'use client';

import React, {FC} from 'react';
import ActionsBar from '@/app/[todoId]/ActionsBar';
import {Button} from '@/components/ui/button';
import {ITaskWithOwnerScheme} from '@/types/task';
import {useRouter} from 'next/navigation';
import backendAPI from '@/backendAPI';
import * as Skeletons from './Skeletons';
import {AxiosInstance} from 'axios';
import {useSession} from 'next-auth/react';
import {createAuthedAxiosInst} from '@/backendAxios';
import {useQueryClient} from '@tanstack/react-query';


interface Props extends ITaskWithOwnerScheme {}

const Interactive:FC<Props> = ({id, owner_id: ownerId, description, state}) => {
    const {data: session} = useSession();
    const instance = session ? createAuthedAxiosInst(session.user) : null;

    const router = useRouter();
    const queryClient = useQueryClient();

    const handleDelete = async (axiosInstance: AxiosInstance) => {
        const isSure = confirm('Are you sure you want to remove this task?');
        if (!isSure) return;
        const result = await backendAPI.deleteTask(id, axiosInstance);
        if (result.success) {
            await queryClient.invalidateQueries({
                queryKey: [`todo-array-${ownerId}`],
            });
            router.back();
        }
    };
    return (<>
        <h3 className={'text-lg'}>{description}</h3>
        <div className={'grid grid-cols-2 gap-2'}>
            {instance ? <>
                <ActionsBar isDone={state === 'done'} className={'col-span-2 text-lg'}/>
                <Button className={'bg-red-500 text-lg'} onClick={()=>void handleDelete(instance)}> Delete </Button>
                <Button className={'bg-green-500 text-lg'} disabled> Save </Button>
            </> : <>
                <Skeletons.Interactive />
            </>}
        </div>
    </>);
};

export default Interactive;
