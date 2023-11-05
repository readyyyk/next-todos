import {FC} from 'react';
import CenterLayout from '@/components/CenterLayout';

interface Props {}

const Loading:FC<Props> = ({}) => {
    return (
        <CenterLayout>
            <div className={'flex flex-col items-center gap-3'}>
                <p className={'text-center text-3xl font-bold'}>Loading...</p>
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                </div>
            </div>
        </CenterLayout>
    );
};

export default Loading;
