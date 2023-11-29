'use client';

import {FC, useState} from 'react';
import ActionsBar from '@/app/[todoId]/ActionsBar';
import {Button} from '@/components/ui/button';
import {ITaskWithOwnerScheme, TaskState} from '@/types/task';
import {useRouter} from 'next/navigation';
import backendAPI from '@/backendAPI';
import * as Skeletons from './Skeletons';
import {AxiosInstance} from 'axios';
import {useSession} from 'next-auth/react';
import {createAuthedAxiosInst} from '@/backendAxios';
import {useQueryClient} from '@tanstack/react-query';
import {Textarea} from '@/components/ui/textarea';
import {serverRevalidatePath} from '@/lib/pseudoServer';
import {twMerge} from 'tailwind-merge';


interface Props extends ITaskWithOwnerScheme {}

const variants = {
    [TaskState.DONE]: 'bg-green-300 dark:bg-green-800',
    [TaskState.ACTIVE]: 'bg-blue-300 dark:bg-blue-800',
    [TaskState.PASSIVE]: 'bg-gray-300 dark:bg-gray-800',
    [TaskState.IMPORTANT]: 'bg-yellow-300 dark:bg-yellow-800',
};

const Interactive:FC<Props> = (props) => {
    const {id, description, state, owner_id: ownerId} = props;
    const {data: session, status} = useSession();
    const instance = session ?
        session.user.id===ownerId ?
            createAuthedAxiosInst(session.user) : null : null;

    const router = useRouter();
    const queryClient = useQueryClient();

    const [selectedState, setSelectedState] = useState(state);
    const [currentText, setCurrentText] = useState(description);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async (axiosInstance: AxiosInstance) => {
        const isSure = confirm('Are you sure you want to remove this task?');
        if (!isSure) return;
        const result = await backendAPI.deleteTask(id, axiosInstance);
        if (result.success) {
            await queryClient.invalidateQueries({
                queryKey: [`todo-${id}`],
            });
            router.back();
        }
    };
    const handleSubmit = async (axiosInstance: AxiosInstance) => {
        if (!currentText.trim()) {
            setError('Description is required!');
            return;
        }
        setIsLoading(true);

        const result = await backendAPI.updateTask(id, {
            state: selectedState,
            description: currentText,
        }, axiosInstance);
        if (result.success) {
            await queryClient.invalidateQueries({
                queryKey: [`todo-${id}`],
            });
            serverRevalidatePath(`/${id}`);
        }
        setIsLoading(false);
    };
    return (<>
        <div>
            {instance ? <>
                <Textarea
                    placeholder={'Description...'}
                    className={'text-lg'}
                    onChange={(e) => {
                        if (e.target.value.trim()) setError('');
                        setCurrentText(e.target.value);
                    }}
                    value={currentText}
                />
                {error ? <p className={'mt-1 text-red-600'}>{error}</p> : null} </> :
                <h2 className={'text-lg'}>{description}</h2>
            }
        </div>
        {(status==='unauthenticated' || !instance) &&
            <div className={twMerge(
                'text-center text-lg rounded-md p-2',
                variants[state])}
            >
                {state}
            </div>
        }
        <div className={'grid grid-cols-2 gap-2' +
            (!instance ? ' hidden' : '')}>
            {instance ? <>
                <ActionsBar
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    className={'col-span-2 text-lg'}
                />
                <Button
                    className={'bg-red-500 text-lg'}
                    onClick={() => void handleDelete(instance)}
                >
                    Delete
                </Button>
                <Button
                    className={'bg-green-500 text-lg'}
                    onClick={() => void handleSubmit(instance)}
                    loading={isLoading}
                >
                    Save
                </Button>
            </> :
                status === 'loading' ? <Skeletons.Interactive/> : null
            }
        </div>
    </>);
};

export default Interactive;
