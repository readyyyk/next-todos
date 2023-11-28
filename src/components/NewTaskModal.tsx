'use client';

import {FC} from 'react';
import {z} from 'zod';
import Backdrop from '@/components/Backdrop';
import CenterLayout from '@/components/CenterLayout';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod';
import backendAPI from '@/backendAPI';
import {Textarea} from '@/components/ui/textarea';
import {createAuthedAxiosInst} from '@/backendAxios';
import {User} from 'next-auth';
import {useQueryClient} from '@tanstack/react-query';


const validationSchema = z.object({description: z.string().min(1, 'Description is required')});
type IValidationSchema = z.infer<typeof validationSchema>;

interface Props {
    user: User,
}

const NewTaskModal:FC<Props> = ({user}) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const authedInstance = createAuthedAxiosInst(user);

    const onSubmit: SubmitHandler<IValidationSchema> = async (data) => {
        form.clearErrors();
        const resp = await backendAPI.createTask(data, authedInstance);
        if (!resp.success) {
            form.setError('description', {type: 'custom', message: resp.error.message||''});
            return;
        }
        await queryClient.invalidateQueries({
            // TODO: get queryKey from backendAPI call
            queryKey: [`todo-array-${resp.data.owner_id}`],
        });
        router.back();
    };

    return (<Backdrop>
        <CenterLayout className={'bg-primary-foreground'}>
            <h1 className={'text-center text-3xl'}>Crete new Task</h1>
            <FormProvider {...form}>
                <form className="space-y-6" onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}>
                    <FormField
                        control={form.control}
                        name='description'
                        render={({field}) => (
                            <FormItem className={'space-y-1'}>
                                <FormLabel className={'text-xl'}>What do you want to do?</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Describe..." className={'max-h-32'} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={'flex space-x-3'}>
                        <Button type='submit' variant='success' loading={form.formState.isSubmitting}>Create</Button>
                        <Link href={'/'}>
                            <Button variant='outline'>Cancel</Button>
                        </Link>
                    </div>
                </form>
            </FormProvider>
        </CenterLayout>
    </Backdrop>);
};

export default NewTaskModal;
