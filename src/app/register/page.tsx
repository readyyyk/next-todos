'use client';

import {FC} from 'react';
import {z} from 'zod';
import CenterLayout from '@/components/CenterLayout';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import schema from './schema';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

type validationSchema = z.infer<typeof schema>;


interface Props {}

const Page:FC<Props> = ({}) => {
    const form = useForm<validationSchema>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<validationSchema> = (data) => {
        console.log(data);
    };

    return (
        <CenterLayout>
            <h1 className={'text-center text-3xl'}>Login</h1>
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
                            name="firstName"
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
                            name="lastName"
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
                    <Button type="submit">Submit</Button>
                </form>
            </FormProvider>
        </CenterLayout>
    );
};

export default Page;
