'use client';

import {FC} from 'react';
import {z} from 'zod';
import CenterLayout from '@/components/CenterLayout';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import schema from '@/types/signUp';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import backendAPI from '@/backendAPI';
import {axiosInst} from '@/backendAxios';
import {signIn} from 'next-auth/react';
import Link from 'next/link';

type validationSchema = z.infer<typeof schema>;


interface Props {}

const Page:FC<Props> = ({}) => {
    const form = useForm<validationSchema>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<validationSchema> = async (data) => {
        form.clearErrors();
        const resp = await backendAPI.signup(data, axiosInst);
        if (!resp.success) {
            if (resp.data.detail === 'IntegrityError on creating User') {
                form.setError('username', {type: 'custom', message: 'Username already exists!'});
                return;
            }
            console.error('signup.Page.onSubmit: resp is', resp);
            return;
        }
        await signIn('signup_auth', {
            data: JSON.stringify(resp.data),
            callbackUrl: '/',
            redirect: true,
        });
    };

    return (
        <CenterLayout>
            <h1 className={'text-center text-3xl'}>Sign up</h1>
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
                    <div className={'grid grid-cols-1 gap-x-2 md:grid-cols-2'}>
                        <h2 className={'col-span-2 text-xl'}>Names</h2>
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="First name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Last name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={'grid grid-cols-1 gap-x-2 md:grid-cols-2'}>
                        <h2 className={'col-span-2 text-xl'}>Passwords</h2>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} type={'password'}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Repeat password" {...field} type={'password'}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className={'flex space-x-3'}>
                        <Button type='submit' variant='success' loading={form.formState.isSubmitting}>Submit</Button>
                        <Link href={'/auth/signin'}>
                            <Button variant='info'>Sign in</Button>
                        </Link>
                    </div>
                </form>
            </FormProvider>
        </CenterLayout>
    );
};

export default Page;
