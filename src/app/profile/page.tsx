import React, {FC, Suspense} from 'react';
import CenterLayout from '@/components/CenterLayout';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {Skeleton} from '@/components/ui/skeleton';
import ClientData from './ClientData';


interface Props {}

const Page:FC<Props> = ({}) => {
    return (
        <CenterLayout>
            <div className={'flex flex-1 items-center gap-4'}>
                <Suspense fallback={
                    <>
                        <Skeleton className="aspect-square h-16 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[130px]" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                    </>
                }><ClientData /></Suspense>
            </div>
            <div className={'grid grid-cols-1 justify-items-center'}>
                <Link href={'/api/auth/signout'}>
                    <Button variant={'danger'} className={'w-min'}>Sign out</Button>
                </Link>
            </div>
        </CenterLayout>
    );
};

export default Page;
