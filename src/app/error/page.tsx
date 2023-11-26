'use client';

import {FC} from 'react';
import {useSearchParams} from 'next/navigation';
import CenterLayout from '@/components/CenterLayout';

interface Props {}

const Page:FC<Props> = ({}) => {
    const searchParams = useSearchParams();

    const error = searchParams.get('error');
    return <CenterLayout>
        <h1 className={'text-xl text-red-900'}> {error} </h1>
    </CenterLayout>;
};

export default Page;
