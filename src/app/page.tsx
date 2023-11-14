import React, {FC, Suspense} from 'react';
import TaskList from '@/app/TaskList';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {getServerSession} from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';
import CenterLayout from '@/components/CenterLayout';
import {Skeleton} from '@/components/ui/skeleton';


const Home:FC = async () => {
    const session = await getServerSession(options);

    return (
        <div className={'container m-auto px-2 py-12'}>
            {!session ?
                <CenterLayout>
                    <h1 className={'text-center text-4xl'}>You&apos;re not logged</h1>
                    <Link href={'/api/auth/signin'} className={'justify-self-center'}>
                        <Button variant={'success'} className={'text-xl'}>Sign in</Button>
                    </Link>
                </CenterLayout> :
                <>
                    <h1 className={'text-center text-4xl'}>Task list:</h1>
                    <div className={'mt-10 flex w-full flex-col flex-wrap justify-center gap-6 px-2 md:grid md:grid-cols-3'}>
                        <Suspense fallback={<>
                            <Skeleton className={'h-40'}/>
                            <Skeleton className={'h-52'}/>
                            <Skeleton className={'h-44'}/>
                        </>}>
                            <TaskList />
                        </Suspense>
                    </div>
                </>
            }
        </div>
    );
};

export default Home;
