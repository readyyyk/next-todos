import {FC, ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';

interface Props {
    children: ReactNode,
    className?: string,
}

const CenterLayout:FC<Props> = ({children, className}) => {
    return (
        <div className={'absolute left-0 top-0 grid min-h-screen w-full place-content-center px-2'} data-backdrop={true}>
            <div className={twMerge('m-auto grid w-80 grid-cols-1 gap-6 rounded-xl p-4 shadow-md shadow-slate-300 md:w-96 md:p-6', className)}>
                {children}
            </div>
        </div>
    );
};

export default CenterLayout;
