'use client';

import {FC, useState} from 'react';
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
import {Textarea} from '@/components/ui/textarea';
import {serverRevalidatePath} from '@/lib/pseudoServer';


interface Props extends ITaskWithOwnerScheme {}

const Interactive:FC<Props> = (props) => {
    const {id, description, state} = props;
    const {data: session} = useSession();
    const instance = session ? createAuthedAxiosInst(session.user) : null;

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
            <Textarea
                placeholder={'Description...'}
                className={'text-lg'}
                onChange={(e) => {
                    if (e.target.value.trim()) setError('');
                    setCurrentText(e.target.value);
                }}
                value={currentText}
            />
            {error ? <p className={'mt-1 text-red-600'}>{error}</p> : null}
        </div>
        <div className={'grid grid-cols-2 gap-2'}>
            {instance ? <>
                <ActionsBar
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    className={'col-span-2 text-lg'}
                />
                <Button className={'bg-red-500 text-lg'} onClick={()=>void handleDelete(instance)}> Delete </Button>
                <Button
                    className={'bg-green-500 text-lg'}
                    onClick={() => void handleSubmit(instance)}
                    loading={isLoading}
                >
                    Save
                </Button>
            </> : <>
                <Skeletons.Interactive />
            </>}
        </div>
    </>);
};

export default Interactive;
