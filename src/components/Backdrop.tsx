'use client';

import {FC, ReactNode, MouseEvent} from 'react';
import {twMerge} from 'tailwind-merge';
import {useRouter} from 'next/navigation';


interface Props {
    children?: ReactNode,
    className?: string,
}

const Backdrop:FC<Props> = ({children, className}) => {
    const router = useRouter();

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        e.nativeEvent.target?.getAttribute('data-backdrop') &&
            router.back();
    };
    return (<div
        data-backdrop={true}
        onClick={handleClick}
        className={twMerge(
            'z-50 fixed left-0 top-0 w-[100dvw] h-[100dvh] transition-all bg-zinc-900 bg-opacity-20 animate-in',
            className,
        )}>
        {children}
    </div>);
};

export default Backdrop;
