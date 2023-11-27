'use client';

import {FC} from 'react';
import {z} from 'zod';
import CenterLayout from '@/components/CenterLayout';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import schema from '@/types/signIn';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

type validationSchema = z.infer<typeof schema>;


interface Props {}

const Page:FC<Props> = ({}) => {
    const router = useRouter();
    const form = useForm<validationSchema>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<validationSchema> = async (data) => {
        form.clearErrors();
        const resp = await signIn('credentials', {
            ...data,
            redirect: false,
            callbackUrl: '/',
        });
        if (!resp) throw new Error(`sigin.Page.onSubmit: resp is ${resp}`);
        if (!resp.ok) {
            form.setError('username', {type: 'custom', message: resp.error||''});
            return;
        }
        router.push('/');
    };

    return (
        <CenterLayout>
            <h1 className={'text-center text-3xl'}>Sign in</h1>
            <FormProvider {...form}>
                <form className="space-y-6" onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem className={'space-y-1'}>
                                <FormLabel className={'text-xl'}>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem className={'space-y-1'}>
                                <FormLabel className={'text-xl'}>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} type={'password'}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={'flex space-x-3'}>
                        <Button type='submit' variant='success' loading={form.formState.isSubmitting}>Submit</Button>
                        <Link href={'/auth/signup'}>
                            <Button variant='info'>Sign up</Button>
                        </Link>
                    </div>
                </form>
            </FormProvider>
        </CenterLayout>
    );
};

export default Page;
