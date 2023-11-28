import React, {FC} from 'react';
import {Skeleton} from '@/components/ui/skeleton';
import {Button} from '@/components/ui/button';


const Interactive:FC = ({}) => {
    return (<>
        <Skeleton className={'h-32 text-lg'} />
        <div className={'grid grid-cols-2 gap-2'}>
            <Skeleton className={'col-span-2 grid'}> <Button variant={'ghost'} className={'text-lg'}/> </Skeleton>
            <Skeleton className={'grid'}> <Button variant={'ghost'} className={'text-lg'}/> </Skeleton>
            <Skeleton className={'grid'}> <Button variant={'ghost'} className={'text-lg'}/> </Skeleton>
        </div>
    </>);
};

const User:FC = ({}) => {
    return (<div className={'flex flex-1 items-center gap-4'}>
        <Skeleton className={'aspect-square w-16 rounded-full shadow-md'}/>
        <div className={'flex flex-col justify-center space-y-2'}>
            <Skeleton className={'h-6 w-32 text-xl font-bold'}> </Skeleton>
            <Skeleton className={'h-6 w-16 text-xl font-bold'}> </Skeleton>
        </div>
    </div>);
};

export {Interactive, User};
